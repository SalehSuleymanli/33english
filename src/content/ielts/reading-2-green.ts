import type { Test } from "../tests/types";

export const IELTS_READING_GREEN: Test = {
  id: "ielts-r2-green-cities",
  kind: "ielts-reading",
  level: "upper-intermediate",
  title: { en: "Practice Test 2: Making cities greener", az: "Məşq testi 2: Şəhərləri yaşıllaşdırmaq", ru: "Тренировочный тест 2: Озеленение городов" },
  description: {
    en: "Environment · about 750 words · Yes/No/Not Given (writer's views), multiple choice, summary completion. Difficulty: Band 6–6.5.",
    az: "Ətraf mühit · təxminən 750 söz · Bəli/Xeyr/Verilməyib (müəllifin fikri), çoxseçimli suallar, xülasə tamamlama. Çətinlik: Band 6–6.5.",
    ru: "Экология · около 750 слов · Yes/No/Not Given (мнение автора), множественный выбор, завершение резюме. Сложность: Band 6–6.5.",
  },
  minutes: 20,
  timed: true,
  passage: {
    title: "Making cities greener",
    paragraphs: [
      "By 2050, around two thirds of the world's population is expected to live in cities. For urban planners, this raises an urgent question: how can cities grow without becoming hotter, more polluted and less pleasant to live in? Increasingly, the answer offered is not a new technology but something very old — trees, parks and other green spaces.",
      "The most measurable benefit is temperature. Concrete, asphalt and glass absorb heat during the day and release it at night, which is why city centres can be several degrees warmer than the surrounding countryside, an effect known as the urban heat island. Trees reduce this in two ways: their shade prevents surfaces from heating up, and they release water vapour through their leaves, which cools the air around them. Studies in several European cities have found that streets lined with mature trees can be up to five degrees cooler on summer afternoons than similar streets without them. The effect is strongest where trees are planted close together, forming a continuous canopy, and weakest where single trees stand in wide, paved squares.",
      "Green spaces also help to manage water. When heavy rain falls on hard surfaces, it runs quickly into drains, which can overflow and cause flooding. Soil and plants, by contrast, absorb rainwater and release it slowly. Some cities have therefore begun to replace sections of pavement with 'rain gardens' — shallow planted areas designed to collect water from roofs and roads. I would argue that this approach is not only cheaper than building larger drains but also far more attractive. Green roofs work on a similar principle: a layer of soil and plants on top of a building can hold a large share of the rain that falls on it, and it also insulates the building, reducing the energy needed for heating and air conditioning.",
      "The benefits for human health are harder to measure but are attracting growing attention. Research has linked access to green space with lower levels of stress, and doctors in some countries now 'prescribe' time in nature to patients with mild depression. Children who grow up near parks tend to be more physically active. It is important, however, not to exaggerate these findings. People who live near parks are often wealthier, and wealth itself is connected with better health. Separating the effect of the park from the effect of income is genuinely difficult. Trees also remove some pollutants from the air, although their effect on air quality across a whole city is smaller than many people assume, and certain species release pollen that can make allergies worse.",
      "Creating new green space in a crowded city is rarely simple. Land is expensive, and every square metre given to a park is a square metre that cannot be used for housing. Some planners have responded with creative solutions. In New York, an abandoned elevated railway line was transformed into the High Line, a park that attracts millions of visitors a year. Singapore requires many new buildings to replace the greenery lost during construction, often with gardens on roofs and walls. In my view, these examples show that the lack of space is more often an excuse than a real obstacle. Smaller projects matter too. In many European cities, residents are now encouraged to plant flowers and vegetables in the narrow strips of soil around street trees, turning neglected corners into miniature gardens.",
      "There is, however, an uncomfortable side to urban greening. When a neighbourhood becomes greener and more attractive, property prices and rents may rise, pushing out the very residents who were meant to benefit. This process, sometimes called 'green gentrification', has been observed in several American and European cities. To avoid it, some experts recommend combining new parks with measures to protect affordable housing. Without such measures, greening risks becoming a luxury for the few rather than a public good. Barcelona, for example, has tried to address this by creating many small green areas spread across different neighbourhoods rather than a few large, prestigious parks that attract investors to one district.",
      "Trees are not a complete solution to the problems of modern cities, and they take years to reach their full size. Yet compared with most large infrastructure projects, they are cheap, popular and improve with age. Few other investments can make that claim. A tree planted today may not provide much shade for twenty years, which means that the decisions city councils make now will shape the comfort of their streets for decades.",
    ],
  },
  sections: [
    {
      title: "Questions 1–5: Yes / No / Not Given",
      instructions: {
        en: "Do the statements agree with the views of the writer? Choose YES, NO or NOT GIVEN.",
        az: "Fikirlər müəllifin baxışları ilə üst-üstə düşür? YES (bəli), NO (xeyr) və ya NOT GIVEN (müəllif fikir bildirmir) seçin. Diqqət: burada faktları deyil, müəllifin öz fikrini yoxlayırsınız.",
        ru: "Совпадают ли утверждения с мнением автора? Выберите YES, NO или NOT GIVEN. Внимание: здесь проверяется не факт, а собственная позиция автора.",
      },
      questions: [
        { id: "q1", type: "tfng", yesNo: true, prompt: "Rain gardens are a better solution than building larger drains.", answer: "T", why: { az: "Müəllif yazır: \"I would argue that this approach is not only cheaper … but also far more attractive\".", ru: "Автор пишет: «I would argue that this approach is not only cheaper … but also far more attractive»." } },
        { id: "q2", type: "tfng", yesNo: true, prompt: "The health benefits of green space have been clearly proven.", answer: "F", why: { az: "Müəllif xəbərdarlıq edir: \"It is important … not to exaggerate these findings\".", ru: "Автор предупреждает: «It is important … not to exaggerate these findings»." } },
        { id: "q3", type: "tfng", yesNo: true, prompt: "A lack of space is usually a genuine barrier to creating parks.", answer: "F", why: { az: "\"the lack of space is more often an excuse than a real obstacle\".", ru: "«the lack of space is more often an excuse than a real obstacle»." } },
        { id: "q4", type: "tfng", yesNo: true, prompt: "Singapore's approach should be copied by every city in Asia.", answer: "NG", why: { az: "Müəllif Sinqapuru nümunə gətirir, amma hər kəsin onu təkrarlamalı olduğunu demir.", ru: "Автор приводит Сингапур как пример, но не говорит, что все должны его копировать." } },
        { id: "q5", type: "tfng", yesNo: true, prompt: "Trees are a good investment compared with most large infrastructure projects.", answer: "T", why: { az: "Son abzas: ucuz, populyar, zamanla yaxşılaşır — \"Few other investments can make that claim.\"", ru: "Последний абзац: дёшевы, популярны, со временем лучше — «Few other investments can make that claim.»" } },
      ],
    },
    {
      title: "Questions 6–9: Multiple choice",
      instructions: { en: "Choose the correct answer.", az: "Düzgün cavabı seçin.", ru: "Выберите правильный ответ." },
      questions: [
        { id: "q6", type: "choice", prompt: "According to the passage, trees cool streets by…", options: ["reflecting sunlight back into the sky.", "providing shade and releasing water vapour.", "absorbing heat at night.", "reducing the number of cars."], answer: 1, why: { az: "\"their shade prevents surfaces from heating up, and they release water vapour\".", ru: "«their shade prevents surfaces from heating up, and they release water vapour»." } },
        { id: "q7", type: "choice", prompt: "Why is it difficult to measure the health effects of parks?", options: ["Few people use parks regularly.", "Doctors disagree about stress.", "People near parks are often wealthier, which also affects health.", "Studies have only been done on children."], answer: 2, why: { az: "\"People who live near parks are often wealthier, and wealth itself is connected with better health\".", ru: "«People who live near parks are often wealthier, and wealth itself is connected with better health»." } },
        { id: "q8", type: "choice", prompt: "The High Line in New York is mentioned as an example of…", options: ["a park built on an old railway.", "a rooftop garden.", "a rain garden.", "green gentrification."], answer: 0, why: { az: "\"an abandoned elevated railway line was transformed into the High Line\".", ru: "«an abandoned elevated railway line was transformed into the High Line»." } },
        { id: "q9", type: "choice", prompt: "What is 'green gentrification'?", options: ["Planting trees only in rich areas", "Rising housing costs that push out local residents after greening", "Replacing parks with housing", "Charging people to enter parks"], answer: 1, why: { az: "\"property prices and rents may rise, pushing out the very residents who were meant to benefit\".", ru: "«property prices and rents may rise, pushing out the very residents who were meant to benefit»." } },
      ],
    },
    {
      title: "Questions 10–13: Summary completion",
      instructions: {
        en: "Complete the summary. Use NO MORE THAN TWO WORDS from the passage for each answer.",
        az: "Xülasəni tamamlayın. Hər cavab üçün mətndən İKİ SÖZDƏN ÇOX OLMAYAN ifadə işlədin.",
        ru: "Завершите резюме. Используйте НЕ БОЛЕЕ ДВУХ СЛОВ из текста для каждого ответа.",
      },
      questions: [
        { id: "q10", type: "fill", prompt: "City centres are often warmer than the countryside, an effect called the urban ___.", accept: ["heat island"], why: { az: "\"an effect known as the urban heat island\".", ru: "«an effect known as the urban heat island»." } },
        { id: "q11", type: "fill", prompt: "Streets with mature trees can be up to ___ degrees cooler in summer.", accept: ["five", "5"], why: { az: "\"up to five degrees cooler\".", ru: "«up to five degrees cooler»." } },
        { id: "q12", type: "fill", prompt: "Unlike hard surfaces, soil and plants absorb ___ and release it slowly.", accept: ["rainwater", "water"], why: { az: "\"Soil and plants … absorb rainwater and release it slowly\".", ru: "«Soil and plants … absorb rainwater and release it slowly»." } },
        { id: "q13", type: "fill", prompt: "To prevent green gentrification, experts suggest protecting ___ housing.", accept: ["affordable"], why: { az: "\"measures to protect affordable housing\".", ru: "«measures to protect affordable housing»." } },
      ],
    },
  ],
};
