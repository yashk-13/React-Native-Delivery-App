import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'dish',
  title: 'Dish',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name of dish',
      type: 'string',
      validation:(Rule) => Rule.required(),

    },
    {
      name: 'short_description',
      title: 'short description',
      type: 'string',
      validation:(Rule) => Rule.max(200),

     
    },
    {
      name: 'price',
      title: 'price of dish ',
      type: 'number',
      
    },
    {
      name: 'image',
      title: 'image of dish ',
      type: 'image',
      
    },
  
  ],
 
})
