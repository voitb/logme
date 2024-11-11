import { z } from '../zod';
export declare const loginSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type LoginFormData = z.infer<typeof loginSchema>;
//# sourceMappingURL=authSchemas.d.ts.map