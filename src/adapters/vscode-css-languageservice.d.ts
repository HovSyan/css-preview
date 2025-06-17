declare namespace cssls {
    type Position = {
        length: number;
        offset: number;
        end: number;
    }

    export type Stylesheet = Position & {
        children?: RuleSet[];
        parent: null;
        textProvider: (offset?: number, length?: number) => string;
        type: number;
    }

    export type RuleSet = Position & {
        children: [NodeList, Declaration];
        declarations: Declarations;
        parent: Stylesheet;
        selectors: NodeList;
        type: number;
    }

    export type NodeList = Position & {
        children: Selector[];
        parent: RuleSet;
        type: number;
    }

    export type Declarations = Position & {
        children: Declaration[];
        parent: RuleSet;
        type: number;
    }

    export type Declaration = Position & {
        children: [Property, Expression]
        colonPosition: number;
        parent: Declarations;
        property: Property;
        semicolonPosition: number;
        type: number;
        value: Expression;
    }

    export type Property = Position & {
        children: [Identifier];
        parent: Declaration;
        identifier: Identifier;
        type: number;
    }

    export type Expression = Position & {
        children: BinaryExpression[];
        parent: Declaration;
        type: number;
    }

    export type Identifier = Position & {
        isCustomProperty: boolean;
        parent: Property;
        type: number;
    }

    export type Selector = Position & {
        children: SimpleSelector[];
        parent: NodeList;
        type: number;
    }

    export type SimpleSelector = Position & {
        children: Node[];
        parent: Selector;
        type: number;
    }

    export type Node = Position & {
        nodeType: number;
        parent: SimpleSelector;
        type: number;
    }

    export type BinaryExpression = Position & {
        children: Term[];
        left: Term;
        parent: Expression;
        type: number;
    }

    export type Term = Position & {
        children: Identifier[];
        expression: Identifier;
        type: number;
    }
}