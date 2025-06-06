import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "category name is requires"],
    },
  },
  { timestamps: true }
);

export const categoryMdoel = mongoose.model("Category", categorySchema);
export default categoryMdoel;
