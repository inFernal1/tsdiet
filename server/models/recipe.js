import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const recipesSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    description : {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    ingredients: [{
      name:String,
      portion:Number,
      protein:Number,
      fat:Number,
      carb:Number
    }],
    steps: [String],
    calories: Number,
    protein:Number,
    fat:Number,
    carb:Number,
    proteinHundred:Number,
    fatHundred:Number,
    carbHundred:Number,
    calHundred:Number,
    tags:[[]]

  })
  const Recipe = mongoose.model('recipe', recipesSchema)

export default Recipe
/* title: this.addCaption,
            description: this.addDescribe,
            image: this.addImage,
            ingredients: this.addIngredients,
            steps:this.addSteps,
            calories: cal,
            protein: +protein.toFixed(2),
            fat: +fat.toFixed(2),
            carb: + carb.toFixed(2),
            proteinHundred,
            fatHundred,
            carbHundred,
            calHundred */