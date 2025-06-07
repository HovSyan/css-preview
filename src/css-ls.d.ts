type Position = {
    length: number;
    offset: number;
    end: number;
}

declare type Stylesheet = Position & {
    children: RuleSet[];
    parent: null;
    textProvider: (offset?: number, length?: number) => string;
    type: number;
}

declare type RuleSet = Position & {
    children: [NodeList, Declaration];
    declarations: Declarations;
    parent: Stylesheet;
    selectors: NodeList;
    type: number;
}

declare type NodeList = Position & {
    children: Selector[];
    parent: RuleSet;
    type: number;
}

declare type Declarations = Position & {
    children: Declaration[];
    parent: RuleSet;
    type: number;
}

declare type Declaration = Position & {
    children: [Property, Expression]
    colonPosition: number;
    parent: Declarations;
    property: Property;
    semicolonPosition: number;
    type: number;
    value: Expression;
}

declare type Property = Position & {
    children: [Identifier];
    parent: Declaration;
    identifier: Identifier;
    type: number;
}

declare type Expression = Position & {
    children: BinaryExpression[];
    parent: Declaration;
    type: number;
}

declare type Identifier = Position & {
    isCustomProperty: boolean;
    parent: Property;
    type: number;
}

declare type Selector = Position & {
    children: SimpleSelector[];
    parent: NodeList;
    type: number;
}

declare type SimpleSelector = Position & {
    children: Node[];
    parent: Selector;
    type: number;
}

declare type Node = Position & {
    nodeType: number;
    parent: SimpleSelector;
    type: number;
}

declare type BinaryExpression = Position & {
    children: Term[];
    left: Term;
    parent: Expression;
    type: number;
}

declare type Term = Position & {
    children: Identifier[];
    expression: Identifier;
    type: number;
}