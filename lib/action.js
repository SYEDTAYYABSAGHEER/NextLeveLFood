'use server';
import { saveMeal } from '@/lib/meal';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// import { S3 } from '@aws-sdk/client-s3';



function isInvalidMeal(meal){
  return meal.title.trim().length === 0 || meal.summary.trim().length === 0 || meal.instructions.trim().length === 0;
}

export async function shareMeal(prevState, formData) {
    const meal = {
      title: formData.get('title'),
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      image: formData.get('image'),
      creator: formData.get('name'),
      creator_email: formData.get('email')
    }

    if(isInvalidMeal(meal)){
      return {
        message: 'Please fill in all the fields.',
        status: 'error'
      }
    }

    revalidatePath('/meals', 'layout');

    await saveMeal(meal)
    redirect('/meals');
  }
