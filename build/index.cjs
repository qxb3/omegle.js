var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lib/index.js
var lib_exports = {};
__export(lib_exports, {
  default: () => lib_default
});
module.exports = __toCommonJS(lib_exports);

// lib/OmegleClient.js
var import_axios = __toESM(require("axios"), 1);
var import_events = __toESM(require("events"), 1);
var OmegleClient = class extends import_events.default {
  constructor(options = {}) {
    super(options);
    this.server = options.server ?? "https://front10.omegle.com";
    this.connected = false;
    this.tryingToConnect = false;
    this.typing = false;
    this.messages = [];
    this.defaultLang = "en";
    this.debug = (options == null ? void 0 : options.debug) || false;
  }
  connect(options = { lang: this.defaultLang, topics: [] }) {
    if (this.connected)
      throw new Error("Instance is already connected");
    if (this.tryingToConnect)
      throw new Error("The instance is already trying to connect");
    this.tryingToConnect = true;
    import_axios.default.post(`${this.server}/start?caps=recaptcha2,t2&firstevents=1&lang=${options.lang}&topics=[${options.topics.map((v) => `"${v}"`).join(",") || ""}]`).then(({ data }) => {
      this.id = data.clientID;
      this.connected = true;
      this.tryingToConnect = false;
      if (options.topics.length <= 0)
        this.emit("connected");
      this._listenToEvents();
    });
  }
  disconnect() {
    if (!this.connected)
      throw new Error("Needs to be connected to disconnect");
    import_axios.default.post(`${this.server}/disconnect`, `id=${this.id}`).then(() => {
      this._reset();
      this.emit("disconnected");
    });
  }
  sendMessage(message) {
    if (!message || typeof message !== "string")
      throw new Error("Message cannot be empty");
    if (!this.connected)
      throw new Error("You need to connect first");
    import_axios.default.post(`${this.server}/send`, `msg=${message}&id=${this.id}`).then(() => {
      this.messages.push(["you", message]);
    });
  }
  startTyping() {
    import_axios.default.post(`${this.server}/typing`, `id=${this.id}`).then(() => {
      this.typing = true;
    });
  }
  stopTyping() {
    import_axios.default.post(`${this.server}/stoppedtyping`, `id=${this.id}`).then(() => {
      this.typing = false;
    });
  }
  _listenToEvents() {
    import_axios.default.post(`${this.server}/events`, `id=${this.id}`).then(({ data }) => {
      if (this.debug)
        console.log(data);
      data == null ? void 0 : data.forEach((v, i) => {
        const event = v[0];
        const value = v[1];
        if (["statusInfo", null].includes(event))
          return;
        switch (event) {
          case "connected":
            this.emit("connected", data[i + 1][1]);
            break;
          case "gotMessage":
            this.emit("message", value);
            this.messages.push(["stranger", value]);
            break;
          case "typing":
            this.emit("typing");
            break;
          case "stoppedtyping":
            this.emit("stoppedTyping");
            break;
          case "strangerDisconnected":
            this._reset();
            this.emit("disconnected");
            break;
        }
      });
      if (this.connected)
        this._listenToEvents();
    });
  }
  _reset() {
    this.connected = false;
    this.id = null;
    this.messages = [];
  }
};
var OmegleClient_default = OmegleClient;

// lib/index.js
var lib_default = OmegleClient_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
module.exports = module.exports.default;
