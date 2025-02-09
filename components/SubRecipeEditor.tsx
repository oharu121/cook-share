// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { IngredientSearch } from "@/components/IngredientSearch";
// import { StepEditor } from "@/components/StepEditor";
// import { SubRecipe, Ingredient, Step } from "@/types/recipe";

// interface SubRecipeEditorProps {
//   subRecipe: SubRecipe;
//   onChange: (updatedSubRecipe: SubRecipe) => void;
//   onDelete: () => void;
//   lang: "en" | "ja";
// }

// export function SubRecipeEditor({
//   subRecipe,
//   onChange,
//   onDelete,
//   lang,
// }: SubRecipeEditorProps) {
//   // const [newStep, setNewStep] = useState<Partial<Step>>({});

//   const dict = useDictionary(lang);

//   const addIngredient = (ingredient: Ingredient) => {
//     onChange({
//       ...subRecipe,
//       ingredients: [...subRecipe.ingredients, ingredient],
//     });
//   };

//   const addStep = () => {
//     const step: Step = {
//       id: crypto.randomUUID(),
//       order: subRecipe.steps.length + 1,
//       description: "",
//       usedIngredients: [],
//     };

//     onChange({
//       ...subRecipe,
//       steps: [...subRecipe.steps, step],
//     });
//   };

//   return (
//     <Card className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <div className="space-y-2">
//           <Label>Sub-Recipe Name</Label>
//           <Input
//             value={subRecipe.name}
//             onChange={(e) => onChange({ ...subRecipe, name: e.target.value })}
//             placeholder="e.g., Sauce A"
//           />
//         </div>
//         <Button variant="destructive" onClick={onDelete}>
//           Delete
//         </Button>
//       </div>

//       {/* Ingredients */}
//       <div className="space-y-4 mt-6">
//         <h3 className="font-semibold">Ingredients</h3>
//         <IngredientSearch onSelect={addIngredient} lang={lang} dict={dict} />
//         <div className="space-y-2">
//           {subRecipe.ingredients.map((ingredient, index) => (
//             <div key={ingredient.id} className="flex items-center gap-2">
//               <span>
//                 {ingredient.amount} {ingredient.unit} {ingredient.name}
//               </span>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => {
//                   const newIngredients = [...subRecipe.ingredients];
//                   newIngredients.splice(index, 1);
//                   onChange({ ...subRecipe, ingredients: newIngredients });
//                 }}
//               >
//                 Remove
//               </Button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Steps */}
//       <div className="space-y-4 mt-6">
//         <h3 className="font-semibold">Steps</h3>
//         <Button onClick={addStep}>Add Step</Button>
//         {subRecipe.steps.map((step, index) => (
//           <div key={step.id} className="space-y-2">
//             <Label>Step {index + 1}</Label>
//             <StepEditor
//               step={step}
//               ingredients={subRecipe.ingredients}
//               onChange={(updatedStep) => {
//                 const newSteps = [...subRecipe.steps];
//                 newSteps[index] = updatedStep;
//                 onChange({ ...subRecipe, steps: newSteps });
//               }}
//             />
//           </div>
//         ))}
//       </div>
//     </Card>
//   );
// }
// function useDictionary(lang: string) {
//   throw new Error("Function not implemented.");
// }

