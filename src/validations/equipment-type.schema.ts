import { z } from "zod";

export const createEquipmentTypeSchema = z.object({
    name: z.string().min(1, {
        message: "El nombre del tipo es requerido",
    }).max(255, {
        message: "El nombre del tipo no puede tener más de 255 caracteres"
    }),
    description: z.string().min(1, {
        message: "La descripción del tipo es requerida",
    })
});

export type CreateEquipmentTypeData = z.infer<typeof createEquipmentTypeSchema>;

export const updateEquipmentSchema = createEquipmentTypeSchema.partial();

export type UpdateEquipmentTypeData = z.infer<typeof updateEquipmentSchema>;