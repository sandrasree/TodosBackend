const mongoose =require('mongoose')

const todoSchema=new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
      },
      description: {
        type: String,
        default: '',
      },
      completed: {
        type: Boolean,
        default: false,
      },
    }, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);