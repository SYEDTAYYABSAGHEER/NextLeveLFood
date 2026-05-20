import ShareMealForm from '@/components/meals/share-meal-form';
import { shareMeal } from '@/lib/action';
import classes from './page.module.css';

export default function ShareMealPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <ShareMealForm shareMeal={shareMeal} />
    </>
  );
}
