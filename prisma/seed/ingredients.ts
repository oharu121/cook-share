import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Seed Ingredients
  await prisma.ingredient.createMany({
    data: [
      // 調味料
      { id: "1", defaultName: "Soy Sauce" },
      { id: "2", defaultName: "Mirin" },
      { id: "3", defaultName: "Cooking Sake" },
      { id: "4", defaultName: "Miso" },
      { id: "5", defaultName: "Sugar" },
      { id: "6", defaultName: "Salt" },
      { id: "7", defaultName: "Vinegar" },
      { id: "8", defaultName: "Dashi" },
      { id: "9", defaultName: "Mentsuyu" },
      { id: "10", defaultName: "Shirodashi" },
      { id: "11", defaultName: "Sesame Oil" },
      { id: "12", defaultName: "Salad Oil" },
      { id: "13", defaultName: "Olive Oil" },
      { id: "14", defaultName: "Butter" },
      { id: "15", defaultName: "Mayonnaise" },
      { id: "16", defaultName: "Ketchup" },
      { id: "17", defaultName: "Worcestershire Sauce" },
      { id: "18", defaultName: "Mustard" },
      { id: "19", defaultName: "Wasabi" },
      // 米・麺・パン
      { id: "20", defaultName: "White Rice" },
      { id: "21", defaultName: "Brown Rice" },
      { id: "22", defaultName: "Red Rice" },
      { id: "23", defaultName: "Somen" },
      { id: "24", defaultName: "Udon" },
      { id: "25", defaultName: "Soba" },
      { id: "26", defaultName: "Ramen" },
      { id: "27", defaultName: "Spaghetti" },
      { id: "28", defaultName: "Harusame" },
      { id: "29", defaultName: "Bifun" },
      { id: "30", defaultName: "Chinese Noodles" },
      { id: "31", defaultName: "Bread" },
      { id: "32", defaultName: "French Bread" },
      { id: "33", defaultName: "Mochi" },
      // 魚介類
      { id: "34", defaultName: "Tuna" },
      { id: "35", defaultName: "Salmon" },
      { id: "36", defaultName: "Yellowtail" },
      { id: "37", defaultName: "Horse Mackerel" },
      { id: "38", defaultName: "Mackerel" },
      { id: "39", defaultName: "Sardine" },
      { id: "40", defaultName: "Pacific Saury" },
      { id: "41", defaultName: "Cod" },
      { id: "42", defaultName: "Bonito" },
      { id: "43", defaultName: "Sea Bream" },
      { id: "44", defaultName: "Atka Mackerel" },
      { id: "45", defaultName: "Shrimp" },
      { id: "46", defaultName: "Crab" },
      { id: "47", defaultName: "Squid" },
      { id: "48", defaultName: "Octopus" },
      { id: "49", defaultName: "Shijimi" },
      { id: "50", defaultName: "Asari" },
      { id: "51", defaultName: "Scallop" },
      { id: "52", defaultName: "Oyster" },
      // 肉類
      { id: "53", defaultName: "Beef" },
      { id: "54", defaultName: "Pork" },
      { id: "55", defaultName: "Chicken" },
      { id: "56", defaultName: "Duck" },
      { id: "57", defaultName: "Venison" },
      { id: "58", defaultName: "Horse Meat" },
      { id: "59", defaultName: "Minced Meat" },
      // 野菜
      { id: "60", defaultName: "Onion" },
      { id: "61", defaultName: "Carrot" },
      { id: "62", defaultName: "Potato" },
      { id: "63", defaultName: "Sweet Potato" },
      { id: "64", defaultName: "Taro" },
      { id: "65", defaultName: "Daikon" },
      { id: "66", defaultName: "Burdock" },
      { id: "67", defaultName: "Lotus Root" },
      { id: "68", defaultName: "Cabbage" },
      { id: "69", defaultName: "Lettuce" },
      { id: "70", defaultName: "Chinese Cabbage" },
      { id: "71", defaultName: "Spinach" },
      { id: "72", defaultName: "Komatsuna" },
      { id: "73", defaultName: "Chingensai" },
      { id: "74", defaultName: "Bean Sprouts" },
      { id: "75", defaultName: "Broccoli" },
      { id: "76", defaultName: "Cauliflower" },
      { id: "77", defaultName: "Tomato" },
      { id: "78", defaultName: "Cucumber" },
      { id: "79", defaultName: "Eggplant" },
      { id: "80", defaultName: "Green Pepper" },
      { id: "81", defaultName: "Paprika" },
      { id: "82", defaultName: "Shishito" },
      { id: "83", defaultName: "Pumpkin" },
      { id: "84", defaultName: "Corn" },
      { id: "85", defaultName: "Edamame" },
      { id: "86", defaultName: "Okra" },
      { id: "87", defaultName: "Myoga" },
      { id: "88", defaultName: "Shiso" },
      { id: "89", defaultName: "Leek" },
      { id: "90", defaultName: "Garlic Chives" },
      { id: "91", defaultName: "Celery" },
      // きのこ類
      { id: "92", defaultName: "Shiitake" },
      { id: "93", defaultName: "Shimeji" },
      { id: "94", defaultName: "Enoki" },
      { id: "95", defaultName: "Maitake" },
      { id: "96", defaultName: "Eringi" },
      { id: "97", defaultName: "Nameko" },
      // 豆類・大豆製品
      { id: "98", defaultName: "Natto" },
      { id: "99", defaultName: "Tofu" },
      { id: "100", defaultName: "Aburaage" },
      { id: "101", defaultName: "Atsuage" },
      { id: "102", defaultName: "Ganmodoki" },
      { id: "103", defaultName: "Kinako" },
      { id: "104", defaultName: "Okara" },
      { id: "105", defaultName: "Koya Tofu" },
      { id: "106", defaultName: "Azuki" },
      { id: "107", defaultName: "Black Soybean" },
      // 卵・乳製品
      { id: "108", defaultName: "Egg" },
      { id: "109", defaultName: "Milk" },
      { id: "110", defaultName: "Yogurt" },
      { id: "111", defaultName: "Cheese" },
      { id: "112", defaultName: "Cream" },
      // 海藻類
      { id: "113", defaultName: "Nori" },
      { id: "114", defaultName: "Wakame" },
      { id: "115", defaultName: "Hijiki" },
      { id: "116", defaultName: "Kombu" },
      { id: "117", defaultName: "Tororo Kombu" },
      // 果物
      { id: "118", defaultName: "Apple" },
      { id: "119", defaultName: "Mandarin Orange" },
      { id: "120", defaultName: "Banana" },
      { id: "121", defaultName: "Grape" },
      { id: "122", defaultName: "Strawberry" },
      { id: "123", defaultName: "Peach" },
      { id: "124", defaultName: "Watermelon" },
      { id: "125", defaultName: "Melon" },
      { id: "126", defaultName: "Pear" },
      { id: "127", defaultName: "Persimmon" },
      { id: "128", defaultName: "Cherry" },
      { id: "129", defaultName: "Kiwi" },
      { id: "130", defaultName: "Lemon" },
      // ナッツ・種実類
      { id: "131", defaultName: "Sesame" },
      { id: "132", defaultName: "Walnut" },
      { id: "133", defaultName: "Almond" },
      { id: "134", defaultName: "Peanut" },
      // 乾物・保存食
      { id: "135", defaultName: "Katsuobushi" },
      { id: "136", defaultName: "Chirimenjako" },
      { id: "137", defaultName: "Dried Shiitake" },
      { id: "138", defaultName: "Kiriboshi Daikon" },
      { id: "139", defaultName: "Dried Fish" },
      { id: "140", defaultName: "Surume" },
      { id: "141", defaultName: "Umeboshi" },
      { id: "142", defaultName: "Pickles" },
    ],
    skipDuplicates: true,
  });

  // Create translations separately
  await prisma.ingredientTranslation.createMany({
    data: [
      // 調味料
      { ingredientId: "1", locale: "ja", name: "醤油" },
      { ingredientId: "2", locale: "ja", name: "みりん" },
      { ingredientId: "3", locale: "ja", name: "料理酒" },
      { ingredientId: "4", locale: "ja", name: "味噌" },
      { ingredientId: "5", locale: "ja", name: "砂糖" },
      { ingredientId: "6", locale: "ja", name: "塩" },
      { ingredientId: "7", locale: "ja", name: "酢" },
      { ingredientId: "8", locale: "ja", name: "だし" },
      { ingredientId: "9", locale: "ja", name: "めんつゆ" },
      { ingredientId: "10", locale: "ja", name: "白だし" },
      { ingredientId: "11", locale: "ja", name: "ごま油" },
      { ingredientId: "12", locale: "ja", name: "サラダ油" },
      { ingredientId: "13", locale: "ja", name: "オリーブオイル" },
      { ingredientId: "14", locale: "ja", name: "バター" },
      { ingredientId: "15", locale: "ja", name: "マヨネーズ" },
      { ingredientId: "16", locale: "ja", name: "ケチャップ" },
      { ingredientId: "17", locale: "ja", name: "ウスターソース" },
      { ingredientId: "18", locale: "ja", name: "からし" },
      { ingredientId: "19", locale: "ja", name: "わさび" },
      // 米・麺・パン
      { ingredientId: "20", locale: "ja", name: "白米" },
      { ingredientId: "21", locale: "ja", name: "玄米" },
      { ingredientId: "22", locale: "ja", name: "赤飯" },
      { ingredientId: "23", locale: "ja", name: "そうめん" },
      { ingredientId: "24", locale: "ja", name: "うどん" },
      { ingredientId: "25", locale: "ja", name: "そば" },
      { ingredientId: "26", locale: "ja", name: "ラーメン" },
      { ingredientId: "27", locale: "ja", name: "スパゲッティ" },
      { ingredientId: "28", locale: "ja", name: "春雨" },
      { ingredientId: "29", locale: "ja", name: "ビーフン" },
      { ingredientId: "30", locale: "ja", name: "中華麺" },
      { ingredientId: "31", locale: "ja", name: "食パン" },
      { ingredientId: "32", locale: "ja", name: "フランスパン" },
      { ingredientId: "33", locale: "ja", name: "お餅" },
      // 魚介類
      { ingredientId: "34", locale: "ja", name: "マグロ" },
      { ingredientId: "35", locale: "ja", name: "サーモン" },
      { ingredientId: "36", locale: "ja", name: "ブリ" },
      { ingredientId: "37", locale: "ja", name: "アジ" },
      { ingredientId: "38", locale: "ja", name: "サバ" },
      { ingredientId: "39", locale: "ja", name: "イワシ" },
      { ingredientId: "40", locale: "ja", name: "サンマ" },
      { ingredientId: "41", locale: "ja", name: "タラ" },
      { ingredientId: "42", locale: "ja", name: "カツオ" },
      { ingredientId: "43", locale: "ja", name: "鯛" },
      { ingredientId: "44", locale: "ja", name: "ホッケ" },
      { ingredientId: "45", locale: "ja", name: "エビ" },
      { ingredientId: "46", locale: "ja", name: "カニ" },
      { ingredientId: "47", locale: "ja", name: "イカ" },
      { ingredientId: "48", locale: "ja", name: "タコ" },
      { ingredientId: "49", locale: "ja", name: "しじみ" },
      { ingredientId: "50", locale: "ja", name: "あさり" },
      { ingredientId: "51", locale: "ja", name: "ホタテ" },
      { ingredientId: "52", locale: "ja", name: "牡蠣" },
      // 肉類
      { ingredientId: "53", locale: "ja", name: "牛肉" },
      { ingredientId: "54", locale: "ja", name: "豚肉" },
      { ingredientId: "55", locale: "ja", name: "鶏肉" },
      { ingredientId: "56", locale: "ja", name: "鴨肉" },
      { ingredientId: "57", locale: "ja", name: "合鴨肉" },
      { ingredientId: "58", locale: "ja", name: "馬肉" },
      { ingredientId: "59", locale: "ja", name: "挽肉" },
      // 野菜
      { ingredientId: "60", locale: "ja", name: "玉ねぎ" },
      { ingredientId: "61", locale: "ja", name: "にんじん" },
      { ingredientId: "62", locale: "ja", name: "じゃがいも" },
      { ingredientId: "63", locale: "ja", name: "さつまいも" },
      { ingredientId: "64", locale: "ja", name: "里芋" },
      { ingredientId: "65", locale: "ja", name: "大根" },
      { ingredientId: "66", locale: "ja", name: "ごぼう" },
      { ingredientId: "67", locale: "ja", name: "れんこん" },
      { ingredientId: "68", locale: "ja", name: "キャベツ" },
      { ingredientId: "69", locale: "ja", name: "レタス" },
      { ingredientId: "70", locale: "ja", name: "白菜" },
      { ingredientId: "71", locale: "ja", name: "ほうれん草" },
      { ingredientId: "72", locale: "ja", name: "小松菜" },
      { ingredientId: "73", locale: "ja", name: "チンゲンサイ" },
      { ingredientId: "74", locale: "ja", name: "もやし" },
      { ingredientId: "75", locale: "ja", name: "ブロッコリー" },
      { ingredientId: "76", locale: "ja", name: "カリフラワー" },
      { ingredientId: "77", locale: "ja", name: "トマト" },
      { ingredientId: "78", locale: "ja", name: "きゅうり" },
      { ingredientId: "79", locale: "ja", name: "なす" },
      { ingredientId: "80", locale: "ja", name: "ピーマン" },
      { ingredientId: "81", locale: "ja", name: "パプリカ" },
      { ingredientId: "82", locale: "ja", name: "ししとう" },
      { ingredientId: "83", locale: "ja", name: "かぼちゃ" },
      { ingredientId: "84", locale: "ja", name: "とうもろこし" },
      { ingredientId: "85", locale: "ja", name: "えだまめ" },
      { ingredientId: "86", locale: "ja", name: "オクラ" },
      { ingredientId: "87", locale: "ja", name: "みょうが" },
      { ingredientId: "88", locale: "ja", name: "しそ" },
      { ingredientId: "89", locale: "ja", name: "長ねぎ" },
      { ingredientId: "90", locale: "ja", name: "ニラ" },
      { ingredientId: "91", locale: "ja", name: "セロリ" },
      // きのこ類
      { ingredientId: "92", locale: "ja", name: "しいたけ" },
      { ingredientId: "93", locale: "ja", name: "しめじ" },
      { ingredientId: "94", locale: "ja", name: "えのき" },
      { ingredientId: "95", locale: "ja", name: "まいたけ" },
      { ingredientId: "96", locale: "ja", name: "エリンギ" },
      { ingredientId: "97", locale: "ja", name: "なめこ" },
      // 豆類・大豆製品
      { ingredientId: "98", locale: "ja", name: "納豆" },
      { ingredientId: "99", locale: "ja", name: "豆腐" },
      { ingredientId: "100", locale: "ja", name: "油揚げ" },
      { ingredientId: "101", locale: "ja", name: "厚揚げ" },
      { ingredientId: "102", locale: "ja", name: "がんもどき" },
      { ingredientId: "103", locale: "ja", name: "きなこ" },
      { ingredientId: "104", locale: "ja", name: "おから" },
      { ingredientId: "105", locale: "ja", name: "高野豆腐" },
      { ingredientId: "106", locale: "ja", name: "小豆" },
      { ingredientId: "107", locale: "ja", name: "黒豆" },
      // 卵・乳製品
      { ingredientId: "108", locale: "ja", name: "卵" },
      { ingredientId: "109", locale: "ja", name: "牛乳" },
      { ingredientId: "110", locale: "ja", name: "ヨーグルト" },
      { ingredientId: "111", locale: "ja", name: "チーズ" },
      { ingredientId: "112", locale: "ja", name: "生クリーム" },
      // 海藻類
      { ingredientId: "113", locale: "ja", name: "のり" },
      { ingredientId: "114", locale: "ja", name: "わかめ" },
      { ingredientId: "115", locale: "ja", name: "ひじき" },
      { ingredientId: "116", locale: "ja", name: "昆布" },
      { ingredientId: "117", locale: "ja", name: "とろろ昆布" },
      // 果物
      { ingredientId: "118", locale: "ja", name: "りんご" },
      { ingredientId: "119", locale: "ja", name: "みかん" },
      { ingredientId: "120", locale: "ja", name: "バナナ" },
      { ingredientId: "121", locale: "ja", name: "ぶどう" },
      { ingredientId: "122", locale: "ja", name: "いちご" },
      { ingredientId: "123", locale: "ja", name: "もも" },
      { ingredientId: "124", locale: "ja", name: "すいか" },
      { ingredientId: "125", locale: "ja", name: "メロン" },
      { ingredientId: "126", locale: "ja", name: "梨" },
      { ingredientId: "127", locale: "ja", name: "柿" },
      { ingredientId: "128", locale: "ja", name: "さくらんぼ" },
      { ingredientId: "129", locale: "ja", name: "キウイ" },
      { ingredientId: "130", locale: "ja", name: "レモン" },
      // ナッツ・種実類
      { ingredientId: "131", locale: "ja", name: "ごま" },
      { ingredientId: "132", locale: "ja", name: "くるみ" },
      { ingredientId: "133", locale: "ja", name: "アーモンド" },
      { ingredientId: "134", locale: "ja", name: "ピーナッツ" },
      // 乾物・保存食
      { ingredientId: "135", locale: "ja", name: "かつおぶし" },
      { ingredientId: "136", locale: "ja", name: "ちりめんじゃこ" },
      { ingredientId: "137", locale: "ja", name: "干ししいたけ" },
      { ingredientId: "138", locale: "ja", name: "切り干し大根" },
      { ingredientId: "139", locale: "ja", name: "干物" },
      { ingredientId: "140", locale: "ja", name: "するめ" },
      { ingredientId: "141", locale: "ja", name: "梅干し" },
      { ingredientId: "142", locale: "ja", name: "漬物" },
    ],
    skipDuplicates: true,
  });

  // Seed Units
  await prisma.unit.createMany({
    data: [
      { id: "1", defaultName: "gram", locale: "en", abbreviation: "g" },
      { id: "2", defaultName: "kilogram", locale: "en", abbreviation: "kg" },
      { id: "3", defaultName: "cup", locale: "en", abbreviation: "cup" },
      { id: "4", defaultName: "グラム", locale: "ja", abbreviation: "g" },
      { id: "5", defaultName: "キログラム", locale: "ja", abbreviation: "kg" },
      { id: "6", defaultName: "カップ", locale: "ja", abbreviation: "カップ" },
      { id: "7", defaultName: "liter", locale: "en", abbreviation: "L" },
      { id: "8", defaultName: "リットル", locale: "ja", abbreviation: "L" },
      { id: "9", defaultName: "tablespoon", locale: "en", abbreviation: "tbsp" },
      { id: "10", defaultName: "大さじ", locale: "ja", abbreviation: "tbsp" },
      { id: "11", defaultName: "teaspoon", locale: "en", abbreviation: "tsp" },
      { id: "12", defaultName: "小さじ", locale: "ja", abbreviation: "tsp" },
    ],
    skipDuplicates: true,
  });

  // Seed IngredientUnits (Linking Ingredients & Units)
  await prisma.ingredientUnit.createMany({
    data: [
      { ingredientId: "1", unitId: "4" }, // Soy Sauce -> gram
      { ingredientId: "1", unitId: "8" }, // Soy Sauce -> liter
      { ingredientId: "2", unitId: "4" }, // Mirin -> gram
      { ingredientId: "2", unitId: "8" }, // Mirin -> liter
      { ingredientId: "3", unitId: "4" }, // Cooking Sake -> gram
      { ingredientId: "3", unitId: "8" }, // Cooking Sake -> liter
      { ingredientId: "4", unitId: "4" }, // Miso -> gram
      { ingredientId: "5", unitId: "4" }, // Sugar -> gram
      { ingredientId: "5", unitId: "2" }, // Sugar -> kilogram
      { ingredientId: "6", unitId: "4" }, // Salt -> gram
      { ingredientId: "6", unitId: "12" }, // Salt -> teaspoon
      { ingredientId: "7", unitId: "8" }, // Vinegar -> liter
      { ingredientId: "8", unitId: "4" }, // Dashi -> gram
      { ingredientId: "8", unitId: "8" }, // Dashi -> liter
      { ingredientId: "9", unitId: "8" }, // Mentsuyu -> liter
      { ingredientId: "10", unitId: "8" }, // Shirodashi -> liter
      { ingredientId: "11", unitId: "8" }, // Sesame Oil -> liter
      { ingredientId: "12", unitId: "8" }, // Salad Oil -> liter
      { ingredientId: "13", unitId: "8" }, // Olive Oil -> liter
      { ingredientId: "14", unitId: "4" }, // Butter -> gram
      { ingredientId: "14", unitId: "9" }, // Butter -> tablespoon
      { ingredientId: "15", unitId: "8" }, // Mayonnaise -> liter
      { ingredientId: "16", unitId: "8" }, // Ketchup -> liter
      { ingredientId: "17", unitId: "8" }, // Worcestershire Sauce -> liter
      { ingredientId: "18", unitId: "4" }, // Mustard -> gram
      { ingredientId: "19", unitId: "4" }, // Wasabi -> gram
      // 米・麺・パン
      { ingredientId: "20", unitId: "4" }, // White Rice -> gram
      { ingredientId: "21", unitId: "4" }, // Brown Rice -> gram
      { ingredientId: "22", unitId: "4" }, // Red Rice -> gram
      { ingredientId: "23", unitId: "4" }, // Somen -> gram
      { ingredientId: "24", unitId: "4" }, // Udon -> gram
      { ingredientId: "25", unitId: "4" }, // Soba -> gram
      { ingredientId: "26", unitId: "4" }, // Ramen -> gram
      { ingredientId: "27", unitId: "4" }, // Spaghetti -> gram
      { ingredientId: "28", unitId: "4" }, // Harusame -> gram
      { ingredientId: "29", unitId: "4" }, // Bifun -> gram
      { ingredientId: "30", unitId: "4" }, // Chinese Noodles -> gram
      { ingredientId: "31", unitId: "3" }, // Bread -> cup
      { ingredientId: "32", unitId: "3" }, // French Bread -> cup
      { ingredientId: "33", unitId: "4" }, // Mochi -> gram
      // 魚介類
      { ingredientId: "34", unitId: "4" }, // Tuna -> gram
      { ingredientId: "35", unitId: "4" }, // Salmon -> gram
      { ingredientId: "36", unitId: "4" }, // Yellowtail -> gram
      { ingredientId: "37", unitId: "4" }, // Horse Mackerel -> gram
      { ingredientId: "38", unitId: "4" }, // Mackerel -> gram
      { ingredientId: "39", unitId: "4" }, // Sardine -> gram
      { ingredientId: "40", unitId: "4" }, // Pacific Saury -> gram
      { ingredientId: "41", unitId: "4" }, // Cod -> gram
      { ingredientId: "42", unitId: "4" }, // Bonito -> gram
      { ingredientId: "43", unitId: "4" }, // Sea Bream -> gram
      { ingredientId: "44", unitId: "4" }, // Atka Mackerel -> gram
      { ingredientId: "45", unitId: "4" }, // Shrimp -> gram
      { ingredientId: "46", unitId: "4" }, // Crab -> gram
      { ingredientId: "47", unitId: "4" }, // Squid -> gram
      { ingredientId: "48", unitId: "4" }, // Octopus -> gram
      { ingredientId: "49", unitId: "4" }, // Shijimi -> gram
      { ingredientId: "50", unitId: "4" }, // Asari -> gram
      { ingredientId: "51", unitId: "4" }, // Scallop -> gram
      { ingredientId: "52", unitId: "4" }, // Oyster -> gram
      // 肉類
      { ingredientId: "53", unitId: "4" }, // Beef -> gram
      { ingredientId: "54", unitId: "4" }, // Pork -> gram
      { ingredientId: "55", unitId: "4" }, // Chicken -> gram
      { ingredientId: "56", unitId: "4" }, // Duck -> gram
      { ingredientId: "57", unitId: "4" }, // Venison -> gram
      { ingredientId: "58", unitId: "4" }, // Horse Meat -> gram
      { ingredientId: "59", unitId: "4" }, // Minced Meat -> gram
      // 野菜
      { ingredientId: "60", unitId: "4" }, // Onion -> gram
      { ingredientId: "61", unitId: "4" }, // Carrot -> gram
      { ingredientId: "62", unitId: "4" }, // Potato -> gram
      { ingredientId: "63", unitId: "4" }, // Sweet Potato -> gram
      { ingredientId: "64", unitId: "4" }, // Taro -> gram
      { ingredientId: "65", unitId: "4" }, // Daikon -> gram
      { ingredientId: "66", unitId: "4" }, // Burdock -> gram
      { ingredientId: "67", unitId: "4" }, // Lotus Root -> gram
      { ingredientId: "68", unitId: "4" }, // Cabbage -> gram
      { ingredientId: "69", unitId: "4" }, // Lettuce -> gram
      { ingredientId: "70", unitId: "4" }, // Chinese Cabbage -> gram
      { ingredientId: "71", unitId: "4" }, // Spinach -> gram
      { ingredientId: "72", unitId: "4" }, // Komatsuna -> gram
      { ingredientId: "73", unitId: "4" }, // Chingensai -> gram
      { ingredientId: "74", unitId: "4" }, // Bean Sprouts -> gram
      { ingredientId: "75", unitId: "4" }, // Broccoli -> gram
      { ingredientId: "76", unitId: "4" }, // Cauliflower -> gram
      { ingredientId: "77", unitId: "4" }, // Tomato -> gram
      { ingredientId: "78", unitId: "4" }, // Cucumber -> gram
      { ingredientId: "79", unitId: "4" }, // Eggplant -> gram
      { ingredientId: "80", unitId: "4" }, // Green Pepper -> gram
      { ingredientId: "81", unitId: "4" }, // Paprika -> gram
      { ingredientId: "82", unitId: "4" }, // Shishito -> gram
      { ingredientId: "83", unitId: "4" }, // Pumpkin -> gram
      { ingredientId: "84", unitId: "4" }, // Corn -> gram
      { ingredientId: "85", unitId: "4" }, // Edamame -> gram
      { ingredientId: "86", unitId: "4" }, // Okra -> gram
      { ingredientId: "87", unitId: "4" }, // Myoga -> gram
      { ingredientId: "88", unitId: "4" }, // Shiso -> gram
      { ingredientId: "89", unitId: "4" }, // Leek -> gram
      { ingredientId: "90", unitId: "4" }, // Garlic Chives -> gram
      { ingredientId: "91", unitId: "4" }, // Celery -> gram
      // きのこ類
      { ingredientId: "92", unitId: "4" }, // Shiitake -> gram
      { ingredientId: "93", unitId: "4" }, // Shimeji -> gram
      { ingredientId: "94", unitId: "4" }, // Enoki -> gram
      { ingredientId: "95", unitId: "4" }, // Maitake -> gram
      { ingredientId: "96", unitId: "4" }, // Eringi -> gram
      { ingredientId: "97", unitId: "4" }, // Nameko -> gram
      // 豆類・大豆製品
      { ingredientId: "98", unitId: "4" }, // Natto -> gram
      { ingredientId: "99", unitId: "4" }, // Tofu -> gram
      { ingredientId: "100", unitId: "4" }, // Aburaage -> gram
      { ingredientId: "101", unitId: "4" }, // Atsuage -> gram
      { ingredientId: "102", unitId: "4" }, // Ganmodoki -> gram
      { ingredientId: "103", unitId: "4" }, // Kinako -> gram
      { ingredientId: "104", unitId: "4" }, // Okara -> gram
      { ingredientId: "105", unitId: "4" }, // Koya Tofu -> gram
      { ingredientId: "106", unitId: "4" }, // Azuki -> gram
      { ingredientId: "107", unitId: "4" }, // Black Soybean -> gram
      // 卵・乳製品
      { ingredientId: "108", unitId: "4" }, // Egg -> gram
      { ingredientId: "109", unitId: "8" }, // Milk -> liter
      { ingredientId: "110", unitId: "8" }, // Yogurt -> liter
      { ingredientId: "111", unitId: "4" }, // Cheese -> gram
      { ingredientId: "112", unitId: "8" }, // Cream -> liter
      // 海藻類
      { ingredientId: "113", unitId: "4" }, // Nori -> gram
      { ingredientId: "114", unitId: "4" }, // Wakame -> gram
      { ingredientId: "115", unitId: "4" }, // Hijiki -> gram
      { ingredientId: "116", unitId: "4" }, // Kombu -> gram
      { ingredientId: "117", unitId: "4" }, // Tororo Kombu -> gram
      // 果物
      { ingredientId: "118", unitId: "4" }, // Apple -> gram
      { ingredientId: "119", unitId: "4" }, // Mandarin Orange -> gram
      { ingredientId: "120", unitId: "4" }, // Banana -> gram
      { ingredientId: "121", unitId: "4" }, // Grape -> gram
      { ingredientId: "122", unitId: "4" }, // Strawberry -> gram
      { ingredientId: "123", unitId: "4" }, // Peach -> gram
      { ingredientId: "124", unitId: "4" }, // Watermelon -> gram
      { ingredientId: "125", unitId: "4" }, // Melon -> gram
      { ingredientId: "126", unitId: "4" }, // Pear -> gram
      { ingredientId: "127", unitId: "4" }, // Persimmon -> gram
      { ingredientId: "128", unitId: "4" }, // Cherry -> gram
      { ingredientId: "129", unitId: "4" }, // Kiwi -> gram
      { ingredientId: "130", unitId: "4" }, // Lemon -> gram
      // ナッツ・種実類
      { ingredientId: "131", unitId: "4" }, // Sesame -> gram
      { ingredientId: "132", unitId: "4" }, // Walnut -> gram
      { ingredientId: "133", unitId: "4" }, // Almond -> gram
      { ingredientId: "134", unitId: "4" }, // Peanut -> gram
      // 乾物・保存食
      { ingredientId: "135", unitId: "4" }, // Katsuobushi -> gram
      { ingredientId: "136", unitId: "4" }, // Chirimenjako -> gram
      { ingredientId: "137", unitId: "4" }, // Dried Shiitake -> gram
      { ingredientId: "138", unitId: "4" }, // Kiriboshi Daikon -> gram
      { ingredientId: "139", unitId: "4" }, // Dried Fish -> gram
      { ingredientId: "140", unitId: "4" }, // Surume -> gram
      { ingredientId: "141", unitId: "4" }, // Umeboshi -> gram
      { ingredientId: "142", unitId: "4" }, // Pickles -> gram
    ],
    skipDuplicates: true,
  });

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
