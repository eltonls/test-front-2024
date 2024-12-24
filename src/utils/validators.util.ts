
const IS_NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ]+([ ][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
const IS_MATRICULA = /^\d{7}$/;

function isNameValid(name: string): boolean {
  if (!name) return false;
  return IS_NAME_REGEX.test(name);
}

function isMatriculaValid(matricula: string) {
  if(!matricula) return false;
  return IS_MATRICULA.test(matricula);
}

function isIdadeValid(idade: string) {
  if(!idade) return false;
  
  const numIdade = Number(idade);

  return numIdade >= 18 && numIdade <= 60;
}

export { isNameValid, isMatriculaValid, isIdadeValid };
