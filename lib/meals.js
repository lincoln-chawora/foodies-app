import sql from 'better-sqlite3';
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs"
import {Buffer} from "buffer";
import randomstring from "randomstring";

const db = sql('meals.db');

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    //throw new Error('Error!');
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals where slug = ?').get(slug)
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, {lower: true});
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();

    const rString = randomstring.generate(7);
    const fileName = `${meal.slug}_${rString}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (error) => {
        if(error) {
            throw new Error('Saving image failed!');
        }
    });

    meal.image = `/images/${fileName}`;

    db.prepare(`
        INSERT INTO meals
            (title, summary, instructions, creator, creator_email, image, slug)
            VALUES(
              @title,
              @summary,
              @instructions,
              @creator,
              @creator_email,
              @image,
              @slug
           )
    `).run(meal);

}