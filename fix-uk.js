const fs = require('fs');
const content = fs.readFileSync('src/locales/uk.json', 'utf8');
const lines = content.split('\n');

const goodStart = lines.slice(0, 101);

const fixedSection = `      {
        "question": "Чи пропонуєте ви екстрене прибирання?",
        "answer": "Звичайно. Для комерційних клієнтів та у випадку гострих інцидентів ми пропонуємо швидку цілодобову аварійну службу."
      },
      {
        "question": "Як розраховується вартість регулярного прибирання?",
        "answer": "Вартість індивідуальна та залежить від площі, ступеня забруднення та частоти. Після безкоштовного огляду ми надаємо прозору пропозицію."
      },
      {
        "question": "Чи привозите ви засоби для прибирання?",
        "answer": "Так, ми використовуємо виключно професійне та екологічно чисте обладнання. Вам не потрібно нічого забезпечувати."
      }
    ]
  },
  "testimonials": {
    "title": "Відгуки клієнтів",
    "subtitle": "Ваше задоволення — наша найбільша мотивація.",
    "google_reviews": "Відгуки Google",
    "all_reviews": "Усі відгуки",
    "verified": "Підтверджено",
    "items": [
      {
        "id": 1,
        "name": "Sybille H.",
        "role": "Офіс-менеджер",
        "service": "Прибирання офісу в Ерлангені",
        "content": "Ми нові клієнти. Дуже ретельне прибирання, професійно та доброзичливо. Ми дуже задоволені.",
        "rating": 5,
        "span": "md:col-span-1"
      },
      {
        "id": 2,
        "name": "Dostapix Fotografie",
        "role": "Директор",
        "service": "Генеральне прибирання в Ерлангені",
        "content": "Усі надзвичайно привітні, швидкі та професійні. Все бездоганно чисто. Дуже задоволений.",
        "rating": 5,
        "span": "md:col-span-2"
      },
      {
        "id": 3,
        "name": "Sasan",
        "role": "Управління нерухомістю",
        "service": "Прибирання в Ерлангені",
        "content": "Чудовий сервіс. Я абсолютно задоволений. Завжди бездоганно чисто та доглянуто.",
        "rating": 5,
        "span": "md:col-span-1"
      }
    ]
  },
  "form": {`;

const restOfFile = lines.slice(103);
const finalContent = goodStart.join('\n') + '\n' + fixedSection + '\n' + restOfFile.join('\n');

fs.writeFileSync('src/locales/uk.json', finalContent, 'utf8');

try {
  JSON.parse(fs.readFileSync('src/locales/uk.json', 'utf8'));
  console.log('uk.json: VALID');
} catch(e) {
  console.log('uk.json ERROR:', e.message);
}
