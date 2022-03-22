"use strict";

/** Custom Types Helper !*/
export declare type AsyncTask<T> = () => Promise<T>;
/** Custom Types Helper !*/
export declare type ArrowFunc<T extends any = any> = (...args: any) => T;
/** Custom Types Helper !*/
export declare type Await<T> = T extends Promise<infer R> ? R : T;
/** Custom Types Helper !*/
export declare type IndexSignatures = string | number | symbol;
/** Custom Types Helper !*/
export declare type Primitives = boolean | IndexSignatures | Nullable;
/** Custom Types Helper !*/
export declare type Nullable<T extends any = never> = T | null | void | undefined | "";

/**
 ** - Filter remove all Optional Keys and potential Nullable values from [Key->Value] (--Linear Version--)
 ** @see {@link https://stackoverflow.com/questions/53050011/remove-null-or-undefined-from-properties-of-a-type}
 **/
export declare type NonNullableProps<T> = {
    [P in keyof T]-?: Exclude<T[P], Nullable>;
};

/**
 ** - Filter remove all Optional Keys and potential Nullable values from [Key->Value] (--Recursive Version--)
 ** @see {@link https://stackoverflow.com/questions/53050011/remove-null-or-undefined-from-properties-of-a-type}
 **/
export declare type NonNullablePropsRecursion<T> = {
    [P in keyof T]-?: NonNullableProps<NonNullable<T[P]>>
};

/**
 ** - Remove all Optional Keys and [Key->Value] that potential have Nullable values
 ** @see {@link https://stackoverflow.com/questions/53050011/remove-null-or-undefined-from-properties-of-a-type}
 **/
export declare type NonPotentialNullableProps<T> = {
    [P in keyof T]-?: (T[P] & Nullable) extends Nullable ? never : T[P];
};

/**
 ** - This will enforce Required Type Coercion for all Properties of an Object to be Required as Mandatory Attributes.
 ** - See: {@link https://stackoverflow.com/questions/47914536/use-partial-in-nested-property-with-typescript}
 **/
export declare type RecursiveRequired<T> = {
    [P in keyof T]-?: T[P] extends object ? RecursiveRequired<T[P]> : T[P];
};

/**
 ** - This will enforce Partial Type Coercion for all Properties of an Object to be Optional.
 ** - See: {@link https://stackoverflow.com/questions/47914536/use-partial-in-nested-property-with-typescript}
 **/
export declare type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends object ? RecursivePartial<T[P]> : T[P];
};

export declare type PlainObject<K extends IndexSignatures = string, V extends any = any> = {
    /** @typescript@4.4.0 - This feature is allowed in the typescript v4.4.0 above !*/
    [key: IndexSignatures | K]: V;
    /** @typescript@4.3.0 - Index Signature type can only be either String or Number !*/
    [key: string]: V;
};

/**
 ** - Typescript Helper to Join 2 types with Collision Properties.
 ** - Since {T1} has higher Priority compared to {T2}. Thus T1 will override T2 collision properties.
 ** @see {@link https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html}
 **/
export declare type Intersection<T1, T2> = T1 & Omit<T2, keyof T1>;

/**
 ** - Create all possible Path for Deep Querying Nested Object.
 ** @see {@link https://stackoverflow.com/questions/58434389/typescript-deep-keyof-of-a-nested-object}
 **/
declare type AbstractTree<T> = {
    [P in keyof T]-?: T[P] extends object
        ? [P] | [P, ...Path<T[P]>]
        : [P];
};

export declare type Path<T> = AbstractTree<T>[keyof AbstractTree<T>];

/**
 ** - Type Helper reducing Tuple pre-defined value.
 ** @see {@link https://github.com/microsoft/TypeScript/issues/12290}
 ** @see {@link https://stackoverflow.com/questions/58434389/typescript-deep-keyof-of-a-nested-object}
 **/
export declare type IDeepAttributesReducer</** - !*/
    T extends PlainObject,
    K1 extends keyof T,
    K2 extends keyof T[K1] = unknown,
    K3 extends keyof T[K1][K2] = unknown,
    K4 extends keyof T[K1][K2][K3] = unknown,
    K5 extends keyof T[K1][K2][K3][K4] = unknown,
    K6 extends keyof T[K1][K2][K3][K4][K5] = unknown,
    K7 extends keyof T[K1][K2][K3][K4][K5][K6] = unknown,
    > = K7 extends IndexSignatures ? [K1, K2, K3, K4, K5, K6, K7]
    : K6 extends IndexSignatures ? [K1, K2, K3, K4, K5, K6]
        : K5 extends IndexSignatures ? [K1, K2, K3, K4, K5]
            : K4 extends IndexSignatures ? [K1, K2, K3, K4]
                : K3 extends IndexSignatures ? [K1, K2, K3]
                    : K2 extends IndexSignatures ? [K1, K2]
                        : K1 extends IndexSignatures ? [K1]
                            : never;
