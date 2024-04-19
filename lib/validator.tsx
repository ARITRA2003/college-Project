import * as z from "zod"

export const eventFormSchema = z.object({
    title: z.string().min(3,"Title must be of 3 characters"),
    description: z.string().min(3,"Description must be of 3 characters").max(50,"Description must be less than 40 characters"),
    location: z.string().min(3,"Location must be of 3 characters").max(50,"Description must be less than 40 characters"),
    imageUrl: z.string(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url(),
    categoryId:z.string()
})