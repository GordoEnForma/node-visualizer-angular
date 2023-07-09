export interface Flow {
    corpid?:                 number;
    orgid?:                  number;
    communicationchannelid?: string;
    chatblockid?:            string;
    title?:                  string;
    description?:            string;
    defaultgroupid?:         string;
    defaultblockid?:         string;
    firstblockid?:           string;
    aiblockid?:              string;
    blockgroup?:             Blockgroup[];
    variablecustom?:         Variablecustom[];
    status?:                 string;
    color?:                  string;
    icontype?:               string;
    tag?:                    string;
    chatblockversionid?:     number;
    aiConfiguration?:        boolean;
    isvalid?:                boolean;
}

export interface Blockgroup {
    id?:        string;
    title?:     string;
    position?:  number;
    typename?:  string;
    blocks?:    Block[];
    collapsed?: boolean;
}

export interface Block {
    id?:                string;
    intents?:           any[];
    title?:             string;
    cards?:             Card[];
    jsoncards?:         string;
    isself?:            boolean;
    typename?:          Typename;
    isvalid?:           boolean;
    color?:             Color;
    mouseover?:         boolean;
    istemplate?:        boolean;
    templateid?:        number;
    templatevariables?: any[];
    onlyVariable?:      boolean;
}

export interface Card {
    id?:              string;
    pluginid?:        string;
    plugincategory?:  Plugincategory;
    typename?:        string;
    tag?:             string;
    isvalid?:         boolean;
    config?:          Config;
    enabled?:         boolean;
    variablereplace?: string[];
    showemoji?:       boolean;
    stringsmooch?:    string;
    surveytype?:      string;
    persistence?:     boolean;
    tablename?:       null;
    fieldname?:       null;
}

export interface Config {
    type?:                PurpleType;
    items?:               Item[];
    conditionenabled?:    boolean;
    cardconditions?:      Cardcondition[];
    variableinput?:       boolean;
    blockid?:             string;
    text?:                string;
    multiple?:            boolean;
    randomlist?:          Randomlist[];
    textlist?:            Textlist[];
    title?:               string;
    headertype?:          HeadertypeEnum;
    header?:              Header;
    body?:                string;
    footer?:              string;
    buttons?:             Button[];
    variableoutput?:      Result;
    allowtext?:           boolean;
    activeinput?:         string;
    enablecategory?:      boolean;
    actiontext?:          string;
    sections?:            ConfigSection[];
    catalogBlockid?:      string;
    redirectonfailure?:   boolean;
    istemplate?:          boolean;
    templateid?:          number;
    templatevariables?:   any[];
    url?:                 string;
    output?:              CartOrderID;
    cartQuantity?:        CartOrderID;
    cartPrice?:           CartOrderID;
    cartProducts?:        CartOrderID;
    id?:                  string;
    product?:             Product;
    sectionList?:         SectionList[];
    notfoundMessage?:     string;
    notfoundBlockid?:     string;
    redirectshopping?:    boolean;
    shoppingBlockid?:     string;
    cartOrderID?:         CartOrderID;
    quantity?:            number;
    onlytext?:            boolean;
    whatsappbutton?:      boolean;
    linkgmaps?:           boolean;
    geocodification?:     boolean;
    caption?:             string;
    locationproperties?:  Locationproperty[];
    selectText?:          string;
    errorText?:           string;
    countryselecttext?:   string;
    countryerrortext?:    string;
    regionselecttext?:    string;
    regionerrortext?:     string;
    provinceselecttext?:  string;
    provinceerrortext?:   string;
    districtselecttext?:  string;
    districterrortext?:   string;
    whatsapp?:            Whatsapp;
    calendareventid?:     number;
    calendareventcode?:   string;
    calendareventname?:   string;
    enableshortlink?:     boolean;
    cancellationmessage?: string;
    variablemonthdate?:   Result;
    variablehourstart?:   Result;
    variableeventname?:   Result;
    variableeventcode?:   Result;
    traveltime?:          boolean;
    latitude?:            string;
    longitude?:           string;
    locationtype?:        string;
    limit?:               number;
    showlocations?:       string;
    validatelocation?:    boolean;
    maxdistance?:         number;
    onlyfiles?:           boolean;
    formproperties?:      Formproperty[];
    defaultanswer?:       string;
    retrytimes?:          number;
    domainenabled?:       boolean;
    pocketbook?:          string;
    operation?:           string;
    description?:         string;
    firstname?:           string;
    lastname?:            string;
    phone?:               string;
    email?:               string;
    address?:             string;
    city?:                string;
    country?:             string;
    currency?:            string;
    amount?:              string;
    result?:              Result;
    merchantid?:          string;
    username?:            string;
    password?:            string;
    privatekey?:          string;
    publickey?:           string;
    integration?:         string;
    method?:              string;
    authorization?:       any[];
    headers?:             any[];
    postformat?:          string;
    parameters?:          any[];
    outputs?:             Locationproperty[];
    urlParams?:           any[];
    results?:             any[];
    fileType?:            string;
    onlyVariable?:        boolean;
}

export interface Button {
    title?:       string;
    description?: string;
    counterid?:   string;
    actiontype?:  Typename;
    blockid?:     null | string;
    text?:        null | string;
    url?:         null | string;
    mouseover?:   boolean;
}

export enum Typename {
    Block = "block",
    Text = "text",
}

export interface Cardcondition {
    conditionvariable?: Conditionvariable;
    conditiontype?:     Conditiontype;
    conditionvalue?:    string;
    logicoperator?:     Logicoperator;
    schedule?:          Schedule;
    variableinput?:     boolean;
}

export enum Conditiontype {
    Empty = "",
    Equals = "equals",
    Greater = "greater",
    Lower = "lower",
    Notequals = "notequals",
    Notexist = "notexist",
    Notincludes = "notincludes",
}

export enum Conditionvariable {
    Address = "address",
    Documenttype = "documenttype",
    Empty = "",
    ShoppingCartPrice = "shopping_cart_price",
    Syspaymentnotification = "syspaymentnotification",
    Systemplatename = "systemplatename",
    Useranswer = "useranswer",
    VarCategoria = "var_categoria",
    VarEntrega = "var_Entrega",
    WaEntityvalue = "wa_entityvalue",
    WaIntent1 = "wa_intent1",
}

export enum Logicoperator {
    And = "AND",
    Empty = "",
    Or = "OR",
}

export interface Schedule {
    l?: D;
    m?: D;
    x?: D;
    j?: D;
    v?: D;
    s?: D;
    d?: D;
}

export interface D {
}

export interface CartOrderID {
    variablename?: Variablename;
    value?:        string;
}

export enum Variablename {
    Empty = "",
    ShoppingCartPrice = "shopping_cart_price",
    ShoppingCartProducts = "shopping_cart_products",
    ShoppingCartQuantity = "shopping_cart_quantity",
    ShoppingOrderID = "shopping_order_id",
}

export interface Formproperty {
    type?:          FormpropertyType;
    title?:         string;
    caption?:       string;
    regex?:         string;
    variableinput?: boolean;
    showemoji?:     boolean;
    variablename?:  string;
    tablename?:     null;
    fieldname?:     null;
    persistence?:   boolean;
    columntype?:    null;
    domain?:        string;
}

export enum FormpropertyType {
    Domain = "domain",
    Text = "text",
}

export enum Header {
    Categorías = "CATEGORÍAS \ud83d\udce6",
    Empty = "",
    GoodFoodGoodLife = "Good Food, Good Life \ud83d\udd4a",
}

export enum HeadertypeEnum {
    Empty = "",
    Text = "text",
}

export interface Item {
    variablejson?:  string;
    variablename?:  Name;
    value?:         string;
    mouseover?:     boolean;
    variableinput?: boolean;
    tablename?:     Tablename | null;
    fieldname?:     Name | null;
    persistence?:   boolean;
    columntype?:    null | string;
}

export enum Name {
    IaDelimit = "ia_delimit",
    Phone = "phone",
    VarCategoria = "var_categoria",
}

export enum Tablename {
    Person = "person",
}

export interface Locationproperty {
    variablecontext?:   string;
    type?:              HeadertypeEnum;
    tablename?:         Tablename | null;
    fieldname?:         null | string;
    persistence?:       boolean;
    columntype?:        Columntype | null;
    variablename?:      string;
    parameterresponse?: string;
    mouseover?:         boolean;
}

export enum Columntype {
    CharacterVarying = "character varying",
    CharacterVarying250 = "character varying(250)",
    CharacterVarying255 = "character varying(255)",
}

export interface Product {
    id?: string;
}

export interface Randomlist {
    value?:         string;
    valueshow?:     string;
    showemoji?:     boolean;
    variableinput?: boolean;
    mouseover?:     boolean;
    manually?:      boolean;
    activeinput?:   RandomlistActiveinput;
}

export enum RandomlistActiveinput {
    Value = "value",
}

export interface Result {
    variablename?: string;
    value?:        string;
    tablename?:    null;
    fieldname?:    null;
    persistence?:  boolean;
    columntype?:   null;
}

export interface SectionList {
    title?:         Title;
    productList?:   Product[];
    quantity?:      number;
    filter?:        Filter;
    order?:         Order;
    showemoji?:     boolean;
    mouseover?:     boolean;
    variableinput?: boolean;
    activeinput?:   ColumnEnum;
}

export enum ColumnEnum {
    Title = "title",
}

export interface Filter {
    title?:              string;
    description?:        null;
    brand?:              null;
    category?:           null;
    condition?:          null;
    color?:              null;
    material?:           null;
    pattern?:            null;
    priceCondition?:     null;
    price?:              null;
    salepriceCondition?: null;
    saleprice?:          null;
    customlabel0?:       string;
    customlabel1?:       null;
    customlabel2?:       null;
    customlabel3?:       null;
    customlabel4?:       null;
    labels?:             string[];
}

export interface Order {
    column?:    ColumnEnum;
    direction?: Direction;
}

export enum Direction {
    Asc = "asc",
}

export enum Title {
    VarCategoria = "{{var_categoria}}",
}

export interface ConfigSection {
    title?:         string;
    buttons?:       Button[];
    mouseover?:     boolean;
    showemoji?:     boolean;
    variableinput?: boolean;
    activeinput?:   ColumnEnum;
}

export interface Textlist {
    text?: string;
}

export enum PurpleType {
    Dynamic = "dynamic",
    Simple = "SIMPLE",
}

export interface Whatsapp {
    header?:               string;
    body?:                 string;
    footer?:               string;
    actiontext?:           string;
    sections?:             WhatsappSection[];
    allowtext?:            boolean;
    bodyfound?:            string;
    bodynotfound?:         string;
    stringsmoochfound?:    string;
    stringsmoochnotfound?: string;
}

export interface WhatsappSection {
    title?:   string;
    buttons?: Button[];
}

export enum Plugincategory {
    Action = "action",
    Content = "content",
    Indicators = "indicators",
    Input = "input",
    Redirect = "redirect",
    StructuredMessage = "structured message",
}

export enum Color {
    RGBA25525525503 = "rgba(255,255,255,0.3)",
}

export interface Variablecustom {
    id?:          string;
    type?:        FormpropertyType;
    name?:        string;
    tablename?:   null | string;
    fieldname?:   null | string;
    persistence?: boolean;
    value?:       string;
    columntype?:  null | string;
}
