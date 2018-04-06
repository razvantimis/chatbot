import assert = require('assert');
import builder = require('claudia-bot-builder');
import Pause = builder.fbTemplate.Pause;
import List = builder.fbTemplate.List;
import Button = builder.fbTemplate.Button;
import Attachment = builder.fbTemplate.Attachment;
import ChatAction = builder.fbTemplate.ChatAction;

import altfredBot from './altfred-smart'

const isUrl = require('./utils/is-url');
const breakText = require('./utils/breaktext');


export const defaultAction = Symbol("a default action")
export const location = Symbol("a location")
export const onText = Symbol("a typed response")
export const onLocation = Symbol("a location")
export const onImage = Symbol("an image")
export const onAudio = Symbol("a voice recording")
export const onVideo = Symbol("a video")
export const onFile = Symbol("a file")



export type ResponseHandler = any

const ordinals = ['first', 'second', 'third', 'forth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth']


export class UnexpectedInputError {
    constructor(public message: string, public repeatQuestion: boolean = true) {}
}

class UndefinedHandlerError extends UnexpectedInputError {
    constructor(handler: ResponseHandler) {
        const keys = Object.getOwnPropertySymbols(handler).map(symbol => /Symbol\((.*)\)/.exec(symbol.toString())![1]);
        super(`Sorry, I didn't quite catch that${keys.length === 0 ? '' : `, I was expecting ${keys.join(' or ')}`}`)
    }
}

export class Directive {
    constructor(private readonly text: string) {}

    toString(): string {
        return this.text;
    }
}

export type Label = String
export class Expect extends Directive {}
export class Goto extends Directive {}


class BaseTemplate {
    template;
    identifier: string
    constructor() {
        this.template = {};
    }

    getReadingDuration() {return this.template.text.match(/\w+/g)!.length * 250;}
    setBaseUrl(this: List, url: string) { return this }
    postbacks: [string, () => Goto | void][]


    setNotificationType(type) {
        if (type !== 'REGULAR' && type !== 'SILENT_PUSH' && type !== 'NO_PUSH')
            throw new Error('Notification type must be one of REGULAR, SILENT_PUSH, or NO_PUSH');
        this.template.notification_type = type;
        return this;
    }

    addQuickReply(text, payload, imageUrl?) {
        if (!text || !payload)
            throw new Error('Both text and payload are required for a quick reply');

        if (payload.length > 1000)
            throw new Error('Payload can not be more than 1000 characters long');
        if (imageUrl && !isUrl(imageUrl))
            throw new Error('Image has a bad url');

        if (!this.template.quick_replies)
            this.template.quick_replies = [];

        if (this.template.quick_replies.length === 11)
            throw new Error('There can not be more than 11 quick replies');

        if (text.length > 20)
            text = breakText(text, 20)[0];

        let quickReply: any = {
            content_type: 'text',
            title: text,
            payload: payload,
        };

        if (imageUrl) quickReply.image_url = imageUrl;

        this.template.quick_replies.push(quickReply);

        return this;
    }

    addQuickReplyLocation() {
        if (!this.template.quick_replies)
            this.template.quick_replies = [];

        if (this.template.quick_replies.length === 11)
            throw new Error('There can not be more than 11 quick replies');

        let quickReply = {
            content_type: 'location'
        };

        this.template.quick_replies.push(quickReply);

        return this;
    }

    get() {
        return this.template;
    }
}

class Text extends BaseTemplate {
    constructor(text) {
        super();
        if (!text)
            throw new Error('Text is required for text template');

        this.template = {
            text: text
        };
    }
}

class Ask extends Text {}

export type Script = Array<BaseTemplate | Label | Directive | ResponseHandler>

export function say(template: TemplateStringsArray, ...substitutions: any[]): Text {
    return new Text(String.raw(template, ...substitutions).replace(/([\s]) +/g, '$1'));
}

export function ask(template: TemplateStringsArray, ...substitutions: any[]): Text {
    return new Ask(String.raw(template, ...substitutions).replace(/([\s]) +/g, '$1'));
}

export function expect(template: TemplateStringsArray, ...substitutions: any[]): Expect {
    return new Expect(String.raw(template, ...substitutions));
}

export function goto(template: TemplateStringsArray, ...substitutions: any[]): Goto {
    return new Goto(String.raw(template, ...substitutions));
}

export function audio(template: TemplateStringsArray, ...substitutions: any[]): Attachment {
    return new Attachment(String.raw(template, ...substitutions), 'audio');
}

export function video(template: TemplateStringsArray, ...substitutions: any[]): Attachment {
    return new Attachment(String.raw(template, ...substitutions), 'video');
}

export function image(template: TemplateStringsArray, ...substitutions: any[]): Attachment {
    return new Attachment(String.raw(template, ...substitutions), 'image');
}

export function file(template: TemplateStringsArray, ...substitutions: any[]): Attachment {
    return new Attachment(String.raw(template, ...substitutions), 'file');
}

export type ButtonHandler = {[title: string]: () => Goto | void}
export type Bubble = [string, string, string, ButtonHandler]

export function buttons(id: string, text: string, handler: ButtonHandler): Button {
    const buttons = new Button(text);
    buttons.identifier = `buttons '${id}'`;
    buttons.postbacks = [];
    Object.keys(handler).forEach((key, i) => {
        const payload = `'${key}' button in buttons '${id}'`;
        buttons.addButton(key, payload).postbacks!.push([payload, handler[key]]);
    });
    return buttons;
}

export function list(id: string, type: 'compact' | 'large', bubbles: Bubble[], handler: ButtonHandler): List {
    const list = new List(type);
    list.identifier = `list '${id}'`;
    list.postbacks = [];
    bubbles.forEach((bubble, index) => {
        const [title, subtitle, image, handler] = bubble;
        list.addBubble(title, subtitle);
        if (image) list.addImage(image);
        if (handler[defaultAction]) {
            const payload = `default action of ${ordinals[index]} bubble of list '${id}'`;
            list.addDefaultAction(payload).postbacks!.push([payload, handler[defaultAction]]);
        }
        Object.keys(handler).forEach((key, i) => {
            const payload = `'${key}' button in ${ordinals[index]} bubble of list '${id}'`;
            list.addButton(key, payload).postbacks!.push([payload, handler[key]])
        });
    });
    Object.keys(handler).forEach((key, i) => {
        const payload = `'${key}' button in list '${id}'`;
        list.addListButton(key, payload).postbacks!.push([payload, handler[key]]);
    });
    return list;
}

export function dialogue<T>(name: string, script: (...context: T[]) => Script): DialogueBuilder<T> {
    const builder = script as DialogueBuilder<T>;
    builder.dialogueName = name;
    return builder;
}

export interface DialogueBuilder<T> {
    (...context: T[]): Script
    dialogueName: string
}

export interface Storage {
    store(state: any): any | Promise<any>
    retrieve(): any | Promise<any>
}

interface Processor {
    consumePostback(identifier: string): boolean
    consumeKeyword(keyword: string): boolean
    consumeResponse(handler: ResponseHandler): Promise<void | Goto | Expect>,
    addQuickReplies(message: BaseTemplate, handler: ResponseHandler): this
    insertPauses(output: BaseTemplate[]): Array<{get(): string}>
}

export class Dialogue<T> {
    private readonly build: () => void
    private readonly state: State
    private readonly handlers: Map<string, () => void | Goto>
    private script: Script
    private outputFilter: (o: BaseTemplate) => boolean
    private logger;

    public baseUrl: string

    constructor(builder: DialogueBuilder<T>, storage: Storage, logger: any, ...context: T[]) {
        this.build = () => this.script = builder(...context);
        this.build();
        this.handlers = new Map();
        this.logger = logger;

        const templates = new Set();
        const labels = new Map();
        const expects = new Map();
        const gotos: {line: number, label: string}[] = [];
        for (let line = 0; line < this.script.length; line++) {
            const value = this.script[line];

            if (value instanceof Expect) {
                if (expects.has(value.toString())) throw new Error(`Duplicate expect statement found on line ${line}: expect \`${value}\``);
                expects.set(value.toString(), line);
                const handler = this.script[++line];
                if (!handler || handler instanceof Directive || handler instanceof BaseTemplate) throw new Error(`Expect statement must be followed by a response handler on line ${line}: expect \`${value}\``);
                if (handler.hasOwnProperty(location) && handler.hasOwnProperty(onLocation)) throw new Error(`Both location and onLocation implemented in the same response handler on line ${line}: expect \`${value}\``);
            } else if (typeof value === 'string') {
                const label = value.startsWith('!') ? value.substring(1) : value;
                if (labels.has(label)) throw new Error(`Duplicate label found on line ${line}: '${value}'`);
                labels.set(label, line);
            } else if (value instanceof Goto) {
                gotos.push({line: line, label: value.toString()});
            } else if (value instanceof BaseTemplate) {
                if (templates.has(value.identifier)) throw new Error(`Duplicate identifier found on line ${line} for ${value.identifier}`);
                if (value.identifier) templates.add(value.identifier);
                (value.postbacks || []).forEach(p => this.handlers.set(p[0], p[1]));
            } else if (value !== null) {
                throw new Error(`Response handler must be preceded by an expect statement on line ${JSON.stringify(this.script, null, 2)}`);
            }
        }
        if (labels.size == this.script.length) throw new Error('Dialogue cannot be empty');
        const goto = gotos.find(g => !labels.has(g.label));
        if (goto) new Error(`Could not find label referenced on line ${goto.line}: goto \`${goto.label}\``);
        this.state = new State(storage, this.logger, expects, labels);
    }

    async execute(directive: Directive) {
        await this.state.retrieveState();
        this.state.jump(directive, `Dialogue.execute(${directive.constructor.name.toLowerCase()} \`${directive.toString()}\`)`)
    }

    setKeywordHandler(keywords: string | string[], handler: 'restart' | 'undo' | (() => void | Goto)) {
        const keys = keywords instanceof Array ? keywords : [keywords];
        const undo = () => {
            this.outputFilter = o => o instanceof Ask;
            this.state.undo(2);
        }
        const h = handler === 'restart' ? () => this.state.restart() : handler === 'undo' ? undo : handler;
        keys.forEach(k => this.handlers.set(`keyword '${k.toLowerCase()}'`, h));
    }

    private async process(message: any, processor: Processor): Promise<string[]> {
        await this.state.retrieveState();
        //process input
        this.logger.info(message)
        const output: Array<BaseTemplate> = []
        if (message.originalRequest.postback) {
            const payload = message.originalRequest.postback.payload;
            processor.consumePostback(payload) || processor.consumeKeyword(payload)
                || this.logger.info(`Postback received with unknown payload '${payload}'`);
        } else if (!processor.consumeKeyword(message.text)) {
            const line = this.state.startLine;
            if (line > 0) try {
                const processResponse = async (line: number): Promise<void> => {
                    const result = await processor.consumeResponse(this.script[line - 1]);
                    if (!(result instanceof Directive)) return;
                    line = this.state.jump(result, `expect \`${this.script[line - 2].toString()}\``);
                    result instanceof Expect && await processResponse(line);
                }
                await processResponse(line);
            } catch (e) {
                if (!(e instanceof UnexpectedInputError)){
                     throw e;
                }
                this.state.undo(1);
                //output.push(new Text(e.message));
                
                let data: any = await altfredBot(message.text);
                this.logger.info(data)
                output.push(new Text(data.receiver));
                this.outputFilter = o => e.repeatQuestion ? o instanceof Ask : false;
            }
        }
        if (this.state.isComplete) {
            throw [];
        }
        //update script
        this.build();
        //gather output
        for (let i = this.state.startLine; i < this.script.length; i++) {
            const element = this.script[i];
            //if element is output
            if (element instanceof BaseTemplate) {
                if (!this.outputFilter || this.outputFilter(element)) output.push(element);
            } else if (element instanceof Goto) {
                i = this.state.jump(element, i) - 1
            } else if (typeof element === 'string') {
                //if element is a breaking label
                if (element.startsWith('!')) break;
            } else if (element instanceof Expect) {
                //persist asking of this question
                await this.state.complete(element);
                return output.length == 0 ? [] :
                    processor.addQuickReplies(output[output.length - 1], this.script[i + 1])
                        .insertPauses(output).map(e => e.get());
            }
        }
        //persist completion 
        await this.state.complete();
        return output.length == 0 ? [] : processor.insertPauses(output).map(e => e.get());
    }

    async consume(message: any, apiRequest: any): Promise<string[]> {
        return this.process(message, {
            consumeKeyword(this: Processor, keyword) {
                return this.consumePostback(`keyword '${keyword.toLowerCase()}'`);
            },
            consumePostback: identifier => {
                const handler = this.handlers.get(identifier);
                if (!handler) return false;
                const goto = handler();
                goto instanceof Goto && this.state.jump(goto, identifier);
                return true;
            },
            consumeResponse: handler => {
                //if empty handler do nothing
                if (Object.getOwnPropertyNames(handler).length == 0 && Object.getOwnPropertySymbols(handler).length == 0) return;
                //handle any attachments
                const handle = <T>(handler: ResponseHandler, invoke: (method: Function) => T, ...keys: Array<string | symbol>): T | undefined => {
                    keys = keys.filter(key => handler.hasOwnProperty(key));
                    if (keys.length == 0) throw new UndefinedHandlerError(handler);
                    return handler[keys[0]] ? invoke(handler[keys[0]]) : undefined;
                }
                for (let attachment of message.originalRequest.message.attachments || []) {
                    switch (attachment.type) {
                        case 'location':
                            const invoke = (m: Function) => m(attachment.payload.coordinates!.lat, attachment.payload.coordinates!.long, attachment.payload.title, attachment.payload.url);
                            return handle(handler, invoke, location, onLocation, defaultAction);
                        case 'image':
                            return handle(handler, m => m(attachment.payload.url), onImage, defaultAction);
                        case 'audio':
                            return handle(handler, m => m(attachment.payload.url), onAudio, defaultAction);
                        case 'video':
                            return handle(handler, m => m(attachment.payload.url), onVideo, defaultAction);
                        case 'file':
                            return handle(handler, m => m(attachment.payload.url), onFile, defaultAction);
                        default:
                            throw new Error(`Unsupported attachment type '${attachment.type}'`)
                    }
                }
                return handle(handler, m => m(message.text), message.text, onText, defaultAction);
            },
            addQuickReplies(this: Processor, message, handler) {
                //add quick replies if present
                if (handler[location]) message.addQuickReplyLocation();
                Object.keys(handler).forEach(key => message.addQuickReply(key, key));
                return this;
            },
            insertPauses: output => {
                //calculate pauses between messages
                const remaining = Math.min(10 * 1000, apiRequest.lambdaContext.getRemainingTimeInMillis() - 2);
                const factor = Math.min(1, remaining / output.reduce((total, o) => total + o.getReadingDuration(), 0));
                //get output and insert pauses
                const messages: Array<{get(): string}> = [];
                output.forEach(message => messages.push(
                    message.setBaseUrl(this.baseUrl).setNotificationType('NO_PUSH'),
                    new ChatAction('typing_on'),
                    new Pause(message.getReadingDuration() * factor)
                ));
                messages.length -= 2;
                return messages;
            }
        })
    }
}

class State {
    private state: Array<{type: 'label' | 'expect' | 'complete', name?: string}>
    private jumpCount = 0;
   

    constructor(private storage: Storage, private logger, private expects: Map<string, number>, private labels: Map<string, number>) {
    }

    async retrieveState() {
        this.state = this.state || await this.storage.retrieve() || [];
    }

    get isComplete(): boolean {
        assert(this.state);
        return this.state[0] && this.state[0].type === 'complete';
    }

    get startLine(): number {
        assert(this.state);
        switch (this.state[0] && this.state[0].type) {
            case 'expect':
                return this.expects.get(this.state[0].name!)! + 2 || 0;
            case 'label':
                return this.labels.get(this.state[0].name!)! + 1 || 0;
            case 'complete':
                return -1;
            case undefined:
                return 0;
            default:
                throw new Error(`Unexpected type ${this.state[0].type}`);
        }
    }

    jump(location: Directive, lineOrIdentifier: number | string): number {
        assert(this.state);
        if (++this.jumpCount > 10) throw new Error(`Endless loop detected ${typeof lineOrIdentifier == 'number' ? 'on line' : 'by'} ${lineOrIdentifier}: ${location.constructor.name.toLowerCase()} \`${location.toString()}\``);
        if (location instanceof Expect) {
            if (!this.expects.has(location.toString())) throw new Error(`Could not find expect referenced ${typeof lineOrIdentifier == 'number' ? 'on line' : 'by'} ${lineOrIdentifier}: expect \`${location.toString()}\``);
            const count = this.state.findIndex(s => s.type === 'expect' && s.name === location.toString()) + 1;
            this.state.splice(0, count, {type: 'expect', name: location.toString()});
        } else {
            const label = location.toString().startsWith('!') ? location.toString().substring(1) : location.toString();
            if (!this.labels.has(label)) throw new Error(`Could not find label referenced ${typeof lineOrIdentifier == 'number' ? 'on line' : 'by'} ${lineOrIdentifier}: goto \`${location.toString()}\``);
            this.logger.info(`Jumping to label '${label}' from ${typeof lineOrIdentifier == 'number' ? 'line' : ''} ${lineOrIdentifier}: goto \`${location.toString()}\``);
            if (this.isComplete) this.state.shift();
            this.state.unshift({type: 'label', name: label});
        }
        return this.startLine;
    }


    async complete(expect?: Expect) {
        assert(this.state);
        this.state.unshift(expect ? {type: 'expect', name: expect.toString()} : {type: 'complete'});
        await this.storage.store(this.state);
    }

    restart() {
        assert(this.state);
        this.state.length = 0;
    }

    undo(steps: number) {
        assert(this.state);
        this.state.splice(0, this.state.findIndex((s, i) => (i + 1 >= steps && s.type === 'expect') || i + 1 === this.state.length) + 1);
    }
}
