"use server";
import { CreateUserParams, UpdateUserParams } from '../../types/index';
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '../database';
import User from '../database/models/userSchema';
import Order from '@/lib/database/models/orderSchema'
import Event from '@/lib/database/models/eventschema'
import { handleError } from '../utils';

export const createuser = async (user: CreateUserParams) => {
    try {
        await connectToDatabase();
        console.log(user);
        const newUser = await User.create(user)

        return JSON.parse(JSON.stringify(newUser));
    }
    catch (err) {
        handleError(err)
    }
}

export async function getUserById(userId: string) {
    try {
        await connectToDatabase()

        const user = await User.findById(userId)

        if (!user) throw new Error('User not found')
        return JSON.parse(JSON.stringify(user))
    } catch (error) {
        handleError(error)
    }
}

export async function updateuser(clerkId: string, user: UpdateUserParams) {
    try {
        await connectToDatabase()

        const updateduser = await User.findOneAndUpdate({ clerkId }, user, { new: true })

        if (!updateduser) throw new Error('User update failed')
        return JSON.parse(JSON.stringify(updateduser))
    } catch (error) {
        handleError(error)
    }
}

export async function deleteuser(clerkId: string) {
    try {
        await connectToDatabase()

        // Find user to delete
        const userToDelete = await User.findOne({ clerkId })

        if (!userToDelete) {
            throw new Error('User not found')
        }

        // Unlink relationships
        await Promise.all([
            // Update the 'events' collection to remove references to the user
            Event.updateMany(
                { _id: { $in: userToDelete.events } },
                { $pull: { organizer: userToDelete._id } }
            ),

            // Update the 'orders' collection to remove references to the user
            Order.updateMany({ _id: { $in: userToDelete.orders } }, { $unset: { buyer: 1 } }),
        ])

        // Delete user
        const deletedUser = await User.findByIdAndDelete(userToDelete._id)
        revalidatePath('/')

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
    } catch (error) {
        handleError(error)
    }
}