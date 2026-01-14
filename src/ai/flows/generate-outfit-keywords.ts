'use server';

/**
 * @fileOverview Generates outfit search keywords based on weather, gender, and style.
 *
 * - generateOutfitKeywords - A function that generates outfit keywords.
 * - GenerateOutfitKeywordsInput - The input type for the generateOutfitKeywords function.
 * - GenerateOutfitKeywordsOutput - The return type for the generateOutfitKeywords function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateOutfitKeywordsInputSchema = z.object({
  temperature: z.number().describe('The average temperature in Celsius.'),
  gender: z.enum(['Male', 'Female', 'Neutral']).describe('The user selected gender.'),
  style: z
    .enum(['Minimalist', 'Sporty', 'Business', 'Streetwear', 'Sweet'])
    .describe('The user selected style.'),
});
export type GenerateOutfitKeywordsInput = z.infer<typeof GenerateOutfitKeywordsInputSchema>;

const GenerateOutfitKeywordsOutputSchema = z.object({
  keywords: z.string().describe('The generated search keywords for outfit images.'),
});
export type GenerateOutfitKeywordsOutput = z.infer<typeof GenerateOutfitKeywordsOutputSchema>;

export async function generateOutfitKeywords(
  input: GenerateOutfitKeywordsInput
): Promise<GenerateOutfitKeywordsOutput> {
  return generateOutfitKeywordsFlow(input);
}

const temperatureKeywords = {
  Cold: 'Down jacket, Coat, Thermal wear',
  Cool: 'Jacket, Hoodie, Knitwear',
  Comfortable: 'Long sleeve shirt, Light outerwear, Jeans',
  Warm: 'Short sleeve T-shirt, Shorts, Light shirt',
  Hot: 'Tank top, Shorts, Lightweight material',
};

const prompt = ai.definePrompt({
  name: 'generateOutfitKeywordsPrompt',
  input: {schema: GenerateOutfitKeywordsInputSchema},
  output: {schema: GenerateOutfitKeywordsOutputSchema},
  prompt: `You are an AI assistant designed to generate search keywords for outfit images based on the weather, gender, and style preferences.

  Based on the temperature, select keywords related to clothing appropriate for that weather. Combine the clothing keywords with the specified gender and style to form a search query suitable for finding outfit images.

  Here are the temperature ranges and keywords:
  Cold: T < 10°C: 羽絨衣, 大衣, 發熱衣
  Cool: 10°C ≤ T < 18°C: 夾克, 衛衣, 針織衫
  Comfortable: 18°C ≤ T < 24°C: 長袖襯衫, 薄外搭, 牛仔褲
  Warm: 24°C ≤ T < 28°C: 短袖 T-shirt, 五分褲, 輕便襯衫
  Hot: T ≥ 28°C: 背心, 短褲, 涼爽材質

  Temperature: {{{temperature}}}
  Gender: {{{gender}}}
  Style: {{{style}}}

  Generate the keywords by combining the temperature-based clothing, gender, and style using the following format: "[Clothing] [Gender] [Style] Outfit".  Do not include any preamble or postamble text, only the keywords.
  `,
});

const generateOutfitKeywordsFlow = ai.defineFlow(
  {
    name: 'generateOutfitKeywordsFlow',
    inputSchema: GenerateOutfitKeywordsInputSchema,
    outputSchema: GenerateOutfitKeywordsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
