import mongoose, { Document, Schema } from "mongoose";

export interface ITodo {
    text: string;
    checked: boolean;
}

export interface ITodoModel extends ITodo, Document { }

const TodoSchema: Schema = new Schema({
    text: { type: String, required: true },
    checked: { type: Boolean, required: true },
}, {
    versionKey: false
});

export default mongoose.model<ITodoModel>('Todo', TodoSchema);