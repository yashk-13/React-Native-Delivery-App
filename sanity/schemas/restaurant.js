import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    // {
    //   name:"id",
    //   type:"number",
    //   title:"ID of Restaurant"
    // },
    {
     name:"name",
     type:"string",
     title:"Name of the Restaurant",
    },
   {
    name:"short_description",
    type:"string",
    title:"short description",
    validation:(Rule) => Rule.max(200),
   },
   {
    name:"image",
    type:"image",
    title:"image of the Restaurant",
   },
   {
    name:"lat",
    type:"number",
    title:"latitude of the Restaurant",
   },
   {
    name:"long",
    type:"number",
    title:"Longitude of the Restaurant",
 
   },
   {
    name:"address",
    type:"string",
    title:"Restaurant address",
    validation:(Rule) => Rule.required(),
   },
   {
    name:"rating",
    type:"number",
    title:"Restaurant rating from (1 to 5)",
    validation:(Rule) => Rule.required().min(1).max(5).error("Please enter a rating"),
   },
   {
    name:"type",
    type:"reference",
    title:"Category",
    validation:(Rule) => Rule.required(),
    to:[{type:"category"}]

   },
   {
    name:"dishes",
    type:"array",
    title:"Dishes",
    of:[{type:"reference", to:[{type:"dish"}] }],
   },
  ],


})
