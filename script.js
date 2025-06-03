//In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id). Questa funzione accetta un id di una ricetta e deve: Recuperare la ricetta da https://dummyjson.com/recipes/{id}
//Estrarre la proprietà userId dalla ricetta
//Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
//Restituire la data di nascita dello chef
//Note del docente
//Scrivi la funzione getChefBirthday(id), che deve:
//Essere asincrona (async).
//Utilizzare await per chiamare le API.
//Restituire una Promise con la data di nascita dello chef.
//Gestire gli errori con try/catch

async function getChefBirthday(id) {
  let recipe;

  try {
    const recipeResponse = await fetch(`https://dummyjson.com/recipes/${id}`);
    recipe = await recipeResponse.json();
  } catch (error) {
    console.error(error);
    throw new Error(`Ricetta non trovata o errore nella richiesta"${id}`);
  }
  if (recipe.message) {
    throw new Error(recipe.message);
  }

  let chef;
  try {
    const chefResponse = await fetch(
      `https://dummyjson.com/users/${recipe.userId}`
    );
    chef = await chefResponse.json();
  } catch (error) {
    console.error(error);
    throw new Error(`Chef non trovato per userId: ${id}`);
  }
  if (chef.message) {
    throw new Error(chef.message);
  }
  const formattedDate = dayjs(chef.birthDate).format("DD/MM/YYYY");

  return formattedDate;
}

(async () => {
  try {
    const birthday = await getChefBirthday(1);
    console.log("Data di nascita dello chef:", birthday);
  } catch (error) {
    console.error("Errore:", error.message);
  }
})();

//🎯 Bonus 1
//Attualmente, se la prima richiesta non trova una ricetta, la seconda richiesta potrebbe comunque essere eseguita causando errori a cascata.

//🎯 Bonus 2
//Utilizza la libreria dayjs per formattare la data di nascita nel formato giorno/mese/anno.
