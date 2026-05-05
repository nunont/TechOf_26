export const QUESTIONS = [
  { id: 1,  emoji: '🐶', answer: 'D', label: 'Dog' },
  { id: 2,  emoji: '🐱', answer: 'C', label: 'Cat' },
  { id: 3,  emoji: '🐭', answer: 'M', label: 'Mouse' },
  { id: 4,  emoji: '🐹', answer: 'H', label: 'Hamster' },
  { id: 5,  emoji: '🐰', answer: 'R', label: 'Rabbit' },
  { id: 6,  emoji: '🦊', answer: 'F', label: 'Fox' },
  { id: 7,  emoji: '🐻', answer: 'B', label: 'Bear' },
  { id: 8,  emoji: '🐼', answer: 'P', label: 'Panda' },
  { id: 9,  emoji: '🐨', answer: 'K', label: 'Koala' },
  { id: 10, emoji: '🐯', answer: 'T', label: 'Tiger' },
  { id: 11, emoji: '🦁', answer: 'L', label: 'Lion' },
  { id: 12, emoji: '🐮', answer: 'C', label: 'Cow' },
  { id: 13, emoji: '🐷', answer: 'P', label: 'Pig' },
  { id: 14, emoji: '🐸', answer: 'F', label: 'Frog' },
  { id: 15, emoji: '🐵', answer: 'M', label: 'Monkey' },
  { id: 16, emoji: '🐔', answer: 'C', label: 'Chicken' },
  { id: 17, emoji: '🐧', answer: 'P', label: 'Penguin' },
  { id: 18, emoji: '🐦', answer: 'B', label: 'Bird' },
  { id: 19, emoji: '🦆', answer: 'D', label: 'Duck' },
  { id: 20, emoji: '🦅', answer: 'E', label: 'Eagle' },
  { id: 21, emoji: '🦉', answer: 'O', label: 'Owl' },
  { id: 22, emoji: '🐺', answer: 'W', label: 'Wolf' },
  { id: 23, emoji: '🐗', answer: 'B', label: 'Boar' },
  { id: 24, emoji: '🐴', answer: 'H', label: 'Horse' },
  { id: 25, emoji: '🦄', answer: 'U', label: 'Unicorn' },
];

export function shuffled(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
