/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PostCreate = {
    properties: {
        post_url: {
            type: 'string',
            isRequired: true,
        },
        title: {
            type: 'string',
            isRequired: true,
        },
        created_at: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        num_hugs: {
            type: 'number',
            isRequired: true,
        },
        patient_description: {
            type: 'string',
            isRequired: true,
        },
        assessment: {
            type: 'string',
            isRequired: true,
        },
        question: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
    },
} as const;
