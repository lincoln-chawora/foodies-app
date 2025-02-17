'use client';

import {useFormState} from "react-dom";
import classes from './page.module.css';
import ImagePicker from "@/components/meals/image-picker";
import {shareMeal} from "@/lib/actions";
import MealsFormSubmit from "@/components/meals/meals-form-submit";



export default function ShareMealPage() {
    const [state, formAction] = useFormState(shareMeal, {message: null});

    return (
        <>
            <header className={classes.header}>
                <h1>
                    Share your <span className={classes.highlight}>favorite meal</span>
                </h1>
                <p>Or any other meal you feel needs sharing!</p>
            </header>
            <main className={classes.main}>
                <form className={classes.form} action={formAction}>
                    <div className={classes.row}>
                        <div>
                            <label htmlFor="name">Your name</label>
                            <input type="text" id="name" name="name" required />
                        </div>
                        <div>
                            <label htmlFor="email">Your email</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" required />
                    </div>
                    <div>
                        <label htmlFor="summary">Short Summary</label>
                        <input type="text" id="summary" name="summary" required />
                    </div>
                    <div>
                        <label htmlFor="instructions">Instructions</label>
                        <textarea
                            id="instructions"
                            name="instructions"
                            rows="10"
                            required
                        ></textarea>
                    </div>
                    <ImagePicker label="Your image" name="image"/>
                    <p>{state.message && <p>{state.message}</p>}</p>
                    <div className={classes.actions}>
                        <MealsFormSubmit/>
                    </div>
                </form>
            </main>
        </>
    );
}