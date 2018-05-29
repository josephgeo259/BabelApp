User.destroy_all
Blog.destroy_all
Comment.destroy_all

geo = User.create!(
    name: "Geo", 
    location: "Atlanta" ,
    spoken_languages: "Malayalam", 
    learning_interests: "French")

bestblog = Blog.create!(
    title: "French",
    post: "French is second only to English for the number of countries where it has official status – 32 as opposed to 45. And, with 56 members, La Francophonie is now larger than the Commonwealth, which has 53.French is also the only language, with English, that is taught in every country of the world, with 100 million students and 2 million teachers – 20 % of whom are outside of francophone countries.",
    user: geo)

comment = Comment.create!(
    title: "France", 
    description: "In 700-500BC the Celtic Gauls arrive in France. In 58-50BC Roman Emperor Julius Caesar defeats the Gauls and France becomes part of the Roman Empire until 476AD. French was ruled by kings for many centuries until the storming of the Bastille during the French Revolution in 1789. Then Napoleon becomes Emperor of the French Republic until he is sent to exile.", 
    user: geo)

joshi = User.create!(
    name: "Joshi", 
    location: "Japan",
    spoken_languages: "Japanese", 
    learning_interests:"Spanish")

newblog = Blog.create!(
    title: "Spanish", 
    post: "Spanish is a dominant language in the West. Spanish is spoken by 500 million people (the most spoken language in the world after Mandarin Chinese) and it’s growing more rapidly than many other languages. By 2050 Spanish will reach 600 million speakers. ", 
    user: joshi)

comment = Comment.create!(
    title: "Spain", 
    description:"Spain was once a number of separate kingdoms with different languages – which were unified in the 15th century after the marriage of two Catholic monarchs Ferdinand of Aragon and Isabella of Castile. These kingdoms became the basis for many of the different regions in modern Spain. Today, there are 17 autonomous regions (15 on the mainland and the Balearic and Canary Islands), and two autonomous enclaves of Ceuta and Melilla in North Africa.", 
    user: joshi)

annie = User.create!(
    name: "Annie", 
    location: "India", 
    spoken_languages: "Hindi", 
    learning_interests:"Swahili")

myblog = Blog.create!(
    title:"Swahilli", 
    post:"a Bantu language widely used as a lingua franca in East Africa and having official status in several countries. The people of Zanzibar and nearby coastal regions, descendants of the original speakers of Swahili", 
    user: annie)

comment = Comment.create!(
    title: "Zanzibar", 
    description:"The name Zanzibar is an Arabic word that is translated as 'the coast of black people'. The Zanzibar archipelago is a series of islands on the Indian Ocean about 16-31 miles from the mainland Republic of Tanzania. It is a semi-autonomous region of the Tanzania. The island has the best beaches in the world - and this is not an exaggeration. If you love lazing around in the sun, then this is the place to go. Below are a few facts that will give you an overview of the Island country.", 
    user: annie)

    puts "DB:Seeded"