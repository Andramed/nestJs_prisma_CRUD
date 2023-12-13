"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddManagerService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var AddManagerService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AddManagerService = _classThis = /** @class */ (function () {
        function AddManagerService_1(prisma, config, jwt) {
            this.prisma = prisma;
            this.config = config;
            this.jwt = jwt;
        }
        AddManagerService_1.prototype.addManager = function (credential) {
            return __awaiter(this, void 0, void 0, function () {
                var rounds, salt, _a, newManager;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            console.log(this.config.get('SALT_ROUNDS'));
                            console.log(credential);
                            rounds = parseInt(this.config.get('SALT_ROUNDS'), 10);
                            if (!isNaN(rounds)) return [3 /*break*/, 1];
                            // Handle the case where the provided value is not a valid number
                            console.error('Invalid SALT_ROUNDS value. Please provide a valid number.');
                            return [3 /*break*/, 4];
                        case 1: return [4 /*yield*/, bcrypt.genSalt(rounds)];
                        case 2:
                            salt = _b.sent();
                            _a = this;
                            return [4 /*yield*/, bcrypt.hash(credential.password, salt)];
                        case 3:
                            _a.hash = _b.sent();
                            _b.label = 4;
                        case 4: return [4 /*yield*/, this.prisma.manager.create({
                                data: {
                                    email: credential.email,
                                    hash: this.hash,
                                    role: 'manager',
                                    firstName: credential.firstName,
                                    lastName: credential.lastName
                                }
                            })];
                        case 5:
                            newManager = _b.sent();
                            return [2 /*return*/, newManager];
                    }
                });
            });
        };
        AddManagerService_1.prototype.creteAdminUser = function (credential) {
            return __awaiter(this, void 0, void 0, function () {
                var adminUser, rounds, salt, _a, admin;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.manager.findUnique({
                                where: { email: credential.email }
                            })];
                        case 1:
                            adminUser = _b.sent();
                            rounds = parseInt(this.config.get('SALT_ROUNDS'), 10);
                            if (!isNaN(rounds)) return [3 /*break*/, 2];
                            console.error('Invalid SALT_ROUNDS value. Please provide a valid number.');
                            return [3 /*break*/, 5];
                        case 2: return [4 /*yield*/, bcrypt.genSalt(rounds)];
                        case 3:
                            salt = _b.sent();
                            _a = this;
                            return [4 /*yield*/, bcrypt.hash(credential.password, salt)];
                        case 4:
                            _a.hash = _b.sent();
                            _b.label = 5;
                        case 5:
                            if (!!adminUser) return [3 /*break*/, 7];
                            console.log('admin user will be created');
                            return [4 /*yield*/, this.prisma.manager.create({
                                    data: {
                                        email: credential.email,
                                        hash: this.hash,
                                        role: "admin"
                                    }
                                })];
                        case 6:
                            admin = _b.sent();
                            if (admin) {
                                console.log("Admin user created");
                            }
                            _b.label = 7;
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        AddManagerService_1.prototype.signIn = function (dtoSignIn) {
            return __awaiter(this, void 0, void 0, function () {
                var user, passMatche, error_1, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log(dtoSignIn);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 7, , 8]);
                            return [4 /*yield*/, this.prisma.manager.findUnique({
                                    where: {
                                        email: dtoSignIn.email
                                    }
                                })];
                        case 2:
                            user = _a.sent();
                            console.log(user);
                            if (!user) return [3 /*break*/, 6];
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            console.log('try to compare password');
                            return [4 /*yield*/, bcrypt.compare(dtoSignIn.password, user.hash)];
                        case 4:
                            passMatche = _a.sent();
                            console.log('password checker');
                            if (passMatche) {
                                console.log('parolile coincid');
                                return [2 /*return*/, this.signUpToken(user.id, user.email, user.role)];
                            }
                            return [3 /*break*/, 6];
                        case 5:
                            error_1 = _a.sent();
                            console.log("passwor dosn't matche");
                            return [3 /*break*/, 6];
                        case 6: return [3 /*break*/, 8];
                        case 7:
                            error_2 = _a.sent();
                            console.log('user with this email dont finded');
                            return [3 /*break*/, 8];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        AddManagerService_1.prototype.signUpToken = function (userId, email, role) {
            return __awaiter(this, void 0, void 0, function () {
                var payload, token;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            payload = {
                                sub: userId,
                                email: email,
                                role: role
                            };
                            return [4 /*yield*/, this.jwt.signAsync(payload, {
                                    expiresIn: "60m",
                                    secret: this.config.get('SECRET_JWT')
                                })];
                        case 1:
                            token = _a.sent();
                            return [2 /*return*/, {
                                    accesToken: token
                                }];
                    }
                });
            });
        };
        return AddManagerService_1;
    }());
    __setFunctionName(_classThis, "AddManagerService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AddManagerService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AddManagerService = _classThis;
}();
exports.AddManagerService = AddManagerService;
