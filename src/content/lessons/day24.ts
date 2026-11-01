import type { Lesson } from "../types";

const day24: Lesson = {
  day: 24,
  stage: "communication",
  title: "The person who…",
  objective: "Join ideas with who, which, that and whose.",
  builds_on: "A relative clause puts one frame inside another: The boy [who talks] is my friend. Section 8 of your notes — with the rule for whom corrected.",
  outcome: "Describe people and things precisely.",
  minutes: 25,
  explanation: [
    "A **relative clause** adds information about a noun, right after it: The boy **who talks a lot** is my friend. The phone **which is on the table** is red.",
    "**who** is for people, **which** is for things and animals, and **that** can be used for **both** people and things (very common in speech).",
    "Ask: is the noun the **subject** of the new clause (it does the action)? Then you need who / which / that: The boy **who talks**… If the noun is the **object** (someone else does the action), you can **leave the pronoun out**: The phone **(that) you mentioned** is red. The boy **(who) you met** is my friend.",
    "**whom** is the formal object form for people: The man **whom** we interviewed… In everyday English, people say **who**, **that** or nothing. Careful: The boy **who you say is** my friend — here it's **who**, because he is the subject of **is**.",
    "**whose** shows possession: The woman **whose car** was stolen called the police.",
  ],
  patterns: [
    {
      name: "Subject relative (pronoun needed)",
      slots: [
        { label: "Noun", role: "subject", text: "The boy" },
        { label: "who / which / that", role: "connector", text: "who" },
        { label: "verb …", role: "verb", text: "talks a lot" },
        { label: "main verb", role: "be", text: "is" },
        { label: "rest", role: "complement", text: "my friend" },
      ],
    },
    {
      name: "Object relative (pronoun optional)",
      slots: [
        { label: "Noun", role: "subject", text: "The phone" },
        { label: "(that)", role: "connector", text: "(that)", optional: true },
        { label: "subject + verb", role: "verb", text: "you mentioned" },
        { label: "main verb", role: "be", text: "is" },
        { label: "rest", role: "complement", text: "red" },
      ],
    },
  ],
  examples: [
    { en: "The boy who talks a lot is my friend.", note: "He talks → subject → **who** needed (original notes)." },
    { en: "The phone which is on the table is red.", note: "It is on the table → **which** needed (original notes)." },
    { en: "The phone (that) you mentioned is red.", note: "You mentioned it → object → **that** optional (original notes, corrected)." },
    { en: "The boy you told me about is my friend.", note: "Replaces 'the boy you said' from the notes." },
    { en: "I have a friend who lives in Berlin.", note: "**who** + verb." },
    { en: "This is the book that changed my life.", note: "**that** for a thing (subject)." },
    { en: "She's the woman whose son plays for the national team.", note: "**whose** + noun = possession." },
    { en: "The candidate whom we interviewed was excellent.", note: "Formal object **whom** (everyday: the candidate we interviewed).", register: "formal" },
  ],
  forms: [
    { label: "Subject clause", positive: "The man who called was polite.", negative: "The man who didn't call…", question: "Who is the man who called?" },
    { label: "Object clause", positive: "The film (that) we saw was great.", negative: "The film (that) we didn't see…", question: "Was the film (that) you saw good?" },
  ],
  mistakes: [
    { wrong: "The man which lives next door is a pilot.", right: "The man who lives next door is a pilot.", why: "People → **who** (or that)." },
    { wrong: "The boy you said is my friend.", right: "The boy you mentioned is my friend.", why: "Say needs what was said. Use **mentioned / told me about**." },
    { wrong: "The boy whom you say is my friend…", right: "The boy who you say is my friend…", why: "He is the subject of **is** → **who**." },
    { wrong: "The book that I bought it is great.", right: "The book that I bought is great.", why: "Don't repeat the object (it) — **that** already replaces it." },
    { wrong: "The woman who her car was stolen…", right: "The woman whose car was stolen…", why: "Possession → **whose**." },
  ],
  guided: {
    goal: "Build: The restaurant that we tried last night was amazing.",
    steps: [
      { label: "Noun", role: "subject", options: ["The restaurant", "Restaurant", "The restaurant it"], answer: 0, why: "The thing we describe." },
      { label: "Relative pronoun (thing)", role: "connector", options: ["who", "that", "whose"], answer: 1, why: "Thing → **that** (or which). Here it could also be left out." },
      { label: "Clause", role: "verb", options: ["we tried last night", "we tried it last night", "tried we last night"], answer: 0, why: "No extra **it** — that replaces it." },
      { label: "Main verb + rest", role: "be", options: ["was amazing.", "it was amazing.", "amazing."], answer: 0, why: "The main frame continues: **was amazing**." },
    ],
    result: "The restaurant that we tried last night was amazing.",
  },
  practice: [
    { id: "d24-p01", type: "choice", prompt: "Choose the correct pronoun.", options: ["The doctor which helped me was kind.", "The doctor who helped me was kind.", "The doctor whose helped me was kind."], answer: 1, explanation: "Person, subject → **who**.", skill: "form" },
    { id: "d24-p02", type: "choice", prompt: "In which sentence can you leave out that?", options: ["The car that crashed was red.", "The car that I bought was red.", "The car that is outside is red."], answer: 1, explanation: "I bought it → object → that is **optional**.", skill: "form" },
    { id: "d24-p03", type: "fill", prompt: "Complete with who, which or whose.", sentence: "I met a man ___ brother works with you.", accept: ["whose"], traps: [{ text: "who", feedback: "His brother → possession → whose." }], explanation: "Possession → **whose**.", skill: "form" },
    { id: "d24-p04", type: "fill", prompt: "Complete with who or which.", sentence: "The laptop ___ I bought last week has stopped working.", accept: ["which", "that"], traps: [{ text: "who", feedback: "A laptop is a thing → which / that." }], explanation: "Thing → **which / that** (or nothing).", skill: "form" },
    { id: "d24-p05", type: "transform", prompt: "Join the sentences.", source: "That's the woman. She teaches my son.", instruction: "Use who.", accept: ["That's the woman who teaches my son.", "That is the woman who teaches my son."], alternatives: [{ text: "That's the woman that teaches my son.", note: "Also correct — that works for people too." }], explanation: "She → **who**.", skill: "form" },
    { id: "d24-p06", type: "transform", prompt: "Join the sentences.", source: "I lost the keys. You gave me the keys.", instruction: "Start with: I lost the keys", accept: ["I lost the keys that you gave me.", "I lost the keys which you gave me.", "I lost the keys you gave me."], explanation: "Object → that / which / nothing.", skill: "form" },
    { id: "d24-p07", type: "order", prompt: "Put the words in order.", tiles: ["The", "boy", "who", "talks", "is", "my", "friend."], explanation: "Noun + who + verb + main verb.", skill: "word-order" },
    { id: "d24-p08", type: "correct", prompt: "Fix the mistake.", wrong: "The film that we watched it was boring.", accept: ["The film that we watched was boring.", "The film we watched was boring.", "The film which we watched was boring."], explanation: "Remove the extra **it**.", skill: "form" },
    { id: "d24-p09", type: "correct", prompt: "Fix the mistake.", wrong: "The neighbor which helped us was very kind.", accept: ["The neighbor who helped us was very kind.", "The neighbour who helped us was very kind.", "The neighbor that helped us was very kind."], explanation: "Person → **who**.", skill: "form" },
    { id: "d24-p10", type: "listen", prompt: "Listen and type.", audioText: "The woman whose bag was stolen is talking to the police.", accept: ["The woman whose bag was stolen is talking to the police."], explanation: "Whose sounds the same as who's — the meaning tells you which.", skill: "listening" },
    { id: "d24-p11", type: "speak", prompt: "Describe a person.", target: "My best friend is someone who always tells me the truth.", explanation: "someone who + verb.", skill: "speaking" },
  ],
  vocabulary: [
    { term: "someone who", meaning: "a person who", example: "I need someone who speaks French." },
    { term: "something that", meaning: "a thing that", example: "It's something that happens every year." },
    { term: "the place where", meaning: "relative for places", example: "This is the café where we met." },
    { term: "the day / time when", meaning: "relative for time", example: "I remember the day when we moved." },
    { term: "the reason why", meaning: "relative for reasons", example: "That's the reason why I left." },
    { term: "the one", meaning: "the person / thing (instead of repeating)", example: "Which bag? — The one that's on the chair." },
  ],
  dialogue: {
    title: "Who's who at the wedding",
    setting: "Leyla explains her family to her friend at a wedding.",
    lines: [
      { speaker: "Mia", line: "Who's the man who's dancing with your grandmother?" },
      { speaker: "Leyla", line: "That's my uncle Rashid — the one who lives in Dubai." },
      { speaker: "Mia", line: "And the woman whose dress is blue?" },
      { speaker: "Leyla", line: "My cousin. She's the person who organized all of this." },
      { speaker: "Mia", line: "The food that they served was incredible." },
      { speaker: "Leyla", line: "The cook is the friend I told you about — the one we met in Sheki." },
    ],
    focus: ["the man who's dancing", "the one who lives in Dubai", "whose dress is blue", "The food that they served", "the friend I told you about"],
  },
  review: [
    { id: "d24-r01", type: "choice", prompt: "Choose the correct sentence.", options: ["The book who I read was long.", "The book I read was long.", "The book I read it was long."], answer: 1, explanation: "Object → pronoun optional; no extra it.", skill: "form" },
    { id: "d24-r02", type: "fill", prompt: "Complete.", sentence: "Do you know anyone ___ can fix a bike?", accept: ["who", "that"], explanation: "Person, subject → **who / that**.", skill: "form" },
    { id: "d24-r03", type: "transform", prompt: "Join with whose.", source: "I have a friend. His father is a pilot.", instruction: "Start with: I have a friend", accept: ["I have a friend whose father is a pilot."], explanation: "his → **whose**.", skill: "form" },
    { id: "d24-r04", type: "order", prompt: "Put the words in order.", tiles: ["The", "phone", "you", "mentioned", "is", "red."], explanation: "Object clause without that.", skill: "word-order" },
    { id: "d24-r05", type: "correct", prompt: "Fix the mistake.", wrong: "The boy you said is my friend.", accept: ["The boy you mentioned is my friend.", "The boy you told me about is my friend.", "The boy you talked about is my friend.", "The boy that you mentioned is my friend.", "The boy who you mentioned is my friend."], explanation: "Use **mentioned / told me about** — say needs what was said.", skill: "form" },
  ],
};

export default day24;
