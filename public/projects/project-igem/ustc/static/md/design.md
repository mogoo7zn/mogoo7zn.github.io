# 1. Chassis Organism 

Considering the practical background of toxin detection in our project Selective Proteolytic Botulinum Toxin Bioassay Based on Yeast (S.P.Y.), we chose *Saccharomyces cerevisiae* BY4741 as the chassis organism, which is an optimal choice for several reasons.

Firstly, the reliable signal input and output are the primary consideration of a detection system. As a eukaryote, *S. cerevisiae* is more suitable for expressing proteins present in mammals (like SNAP-25) than prokaryotes, thereby better simulating the cleavage of BoNT/A. And *S. cerevisiae* has a natural signal amplification system, the G Protein-Coupled Receptor (GPCR) Signaling Pathway, which achieves considerable signal amplification relying on the Mitogen-Activated Protein Kinase (MAPK) signaling cascade. Secondly, safety serves as a crucial prerequisite for technology promotion, especially for our project expecting to be applied in household food detection and medical diagnosis. And for the *S. cerevisiae*, a micro-organism that humans have been using for thousands of years, is generally believed non-pathogenic and highly biosafe. Thirdly, from the perspective of synthetic biology we consider the modifiability of the chassis organism, so we chose BY4741, an experimentally modified strain with a fair capacity for modifications. Genetic engineering modifications like gene knockout are relatively easy to conduct on the *S. cerevisiae* because of its excellent homologous recombination capability. Fourthly, the production of yeast powder by vacuum freeze-drying has become more available. Through this we can improve storage duration of the kit we designed and also reduce transportation costs for further commercialization. Fifthly, our design took advantage of the α-factor signaling pathway, and BY4741 that possesses stable mating type can cater for it.

And for better screening of positive colonies and biosafety, we chose commercialized auxotrophic *S. cerevisiae* BY4741 *ura3*Δ，*his3*Δ, *met15*Δ, *leu2*Δ as the chassis organism.
 
# 2. Dual-yeast detection system 

To reduce the expression burden of yeast and the risk of signal false positives, we designed a dual-yeast detection system consisting of ^Substrate-acting Strain^ and ^Signal-transferring Strain^. We split the entire signaling pathway to let the two strains perform their functions complementarily - the former strain was responsible for receiving the input signal and transmitting it to the other strain, while the latter was in charge of signal amplification and the final output (Figure 1). 

![Figure 1 The dual-yeast detection system.](https://static.igem.wiki/teams/5924/project/design/defig1.webp)

+ ^2.1 Substrate-acting Strain^

    ^2.1.1 Fusion protein^
    BoNT/A cleaves and inactivates SNAP-25, which is the essential characterization of the toxin. The cleavage of SNAP-25 indicates the presence of the toxin, and is suitable as the signal input of the system. To capture this signal, we designed a fusion protein (Figure 2), Pir1p-SNAP-25-α-factor, and display it on the cell wall of Substrate-acting Strain that could be cleaved by BoNT/A. Pir1p-SNAP-25-α-factor is consisted of 3 components: Protein with internal repeats 1 (Pir1p), the amino acid residues 146-202 of SNAP-25 and the Mating-factor alpha (α-factor). The Pir1p is responsible for anchoring the fusion protein to the yeast cell wall$^1$; and the amino acid residues 146-202 of SNAP-25 is the sequence that can be specifically cleaved by BoNT/A$^2$ and acted as a connecting peptide (linker); the α-factor , a signaling molecule (tridecapeptide) that regulates yeast mating, acts as the ligand to activate the signaling pathway of Signal-transferring Strain. When BoNT/A is present in the system, it cleaves the linker SNAP-25 and thus releases the α-factor from the yeast cell wall. 

    ![Figure 2 L. The fusion protein colored by B-factor/pLDDT; R. Red-α-factor, cyan-SNAP-25, Blue-Pir1p $^9$.](https://static.igem.wiki/teams/5924/project/design/desfig2.webp)

    It should be noticed that we inserted the Tobacco Etch Virus (TEV) protease recognition sequence (TEVcs: ENLYQG) at the terminus of SNAP-25 to avoid the use of BoNT/A for safety considerations (as Figure 1,3,4). 

    ![Figure 3 The diagram of the fusion proteins based on the ideal design and practical experiments.](https://static.igem.wiki/teams/5924/project/design/defig3.webp)

    ![Figure 4 The Gene-Protein Correspondence Map.](https://static.igem.wiki/teams/5924/project/design/defig4.webp)

    ^2.1.2 The buffer system maintaining BoNT/A’ s activity^

    BoNT/A is a zinc-dependent metalloprotease which exerts toxicity intracellular. It is important to enable our system to maximally detect the enzymatic cleavage of BoNT/A in vitro, so we should provide suitable buffer system that maintains BoNT/A’ s activity and treat the sample to it before detection. The related conditions are listed in Table 1.

    ^Table 1 The optimized buffer system maintaining BoNT/A’ s activity (3).^
    ![](https://static.igem.wiki/teams/5924/project/design/pdetabb.webp)

    ^2.1.3 Gene knockout for signal optimization^

    In addition to transferring the plasmid to enable yeast to express the fusion protein, we also needed to knock out *STE2*, the gene responsible for the expression of Ste2, utilizing homologous recombination in yeast (Figure 5). As yeast of mating type a (MATa), the BY4741 does not express α-factor but Ste2, which makes it possible for the fusion protein or any of its parts to trigger the expression of the mating gene after being engineered, and hence interrupting its normal metabolism and expression. By knocking it out, the impact should be removed.

    ![Figure 5 The engineering modification of Substrate-acting Strain.](https://static.igem.wiki/teams/5924/project/design/defig5.webp)

+ ^2.2 Signal-transferring Strain^

    ^2.2.1 Modified G Protein-Coupled Receptor Signaling Pathway^ $^4$

    The primary function of Signal-transferring Strain was to receive the signal from Substrate-acting Strain (the free α-factor) and amplify it. The G Protein-Coupled Receptor (GPCR) Signaling Pathway, specifically the one dominating yeast mating, was used to achieve this function. The GPCR Sterile 2 (Ste2) interacts with α-factor and undergoes a conformational change, which affects the Gβγ dimer. The dimer then acts on Sterile 20 (Ste20) to initiate the MAPK cascade, therefore achieving multiple rounds of signal amplification. Finally, Fusion 3 (Fus3) phosphorylates the Sterile 12 (Ste12), a transcription factor, to trigger the transcription of target genes. We knocked out the original downstream gene *Factor Arrest 1* (*FAR1*) in case it retards the cell cycle. And we transferred the reporter gene MjDOD, which is responsible for the expression of Mirabilis jalapa DOPA dioxygenase (MjDOD), into the yeast. This enzyme catalyzes the conversion of L-DOPA, the pigment substrate, to betalamic acid, a light-yellow pigment that serves as the visual output signal of the system. We chose it for its rapid expression, and within an hour we could see the tiny color change (qualitative detection) and about 8 hours we could achieve quantitatively detection$^5$. Moreover, for purification and further signal amplification, we replaced the transcription factor Ste12 with a synthetic one named synthetic transcription factor (sTF), of which the Proline-Rich Domain (PRD) was derived from Ste12 and DNA Binding Domain (DBD) derived from galactose-responsive transcription factor GAL4 (GAL4), a galactose-inducible transcription factor acting on the GAL1, GAL2, GAL7 and GAL10 promoter. Through this modification, we coupled the Galactose Operon Regulatory System (GRS) with the GPCR signaling pathway. We would achieve a thousand-fold signal amplification with the self-coupling of GAL4$^5$ after introducing the pGAL1-GAL4 system, and thereby achieving high-level expression of MjDOD if this strain was triggered by α-factor. (Figure 6, 7)

    ![Figure 6 The expression of the sTF and the self-coulping of GAL4.](https://static.igem.wiki/teams/5924/project/design/defig6.webp)

    ![Figure 7 The entire signaling pathway of GPCR-GRS system. ](https://static.igem.wiki/teams/5924/project/design/defig7.webp)

    ^2.2.2 The improvement of pigment expression^

    Yeast culture media generally exhibit a pale-yellow color, which is familiar to betamalic acid’ s light-yellow, interfering the observation and quantitative measuring of the color. To tackle this problem, we utilized the property that betalamic acid becomes more vivid betalains (a series of stronger and harmless pigments) encountering amine donor$^6$ (Figure 8).

    ![Figure 8 Different colors of different betalains $^6$.](https://static.igem.wiki/teams/5924/project/design/defig8.webp)

    With this property in consideration, we designed a better pigment expression pathway based on dual-enzyme processing. We planned to enable the strain to express lysyl oxidase (LOX) besides MjDOD and use the L-Tyrosine as the substrate, which is more affordable and stable. LOX possesses two enzymatic activities, enabling it to catalyze conversion of both L-DOPA and L-Dopaquinone. L-Dopaquinone self-assembles into Cyclo-DOPA, which can interact with betalamic acid, the product of L-DOPA catalyzed by MjDOD, and exhibits an intense purple-red color$^7$ (Figure 9).

    ![Figure 9 The reaction between products of L-Tyrosine $^7$.](https://static.igem.wiki/teams/5924/project/design/defig9.webp)

    GAL4 acts on both GAL1 and GAL10 promoters, and moreover they are a pair of common bidirectional promoters, so we designed the pigment expression pathway based on this (Figure 9). 

    ![Figure 10 The improved pigment expression pathway.](https://static.igem.wiki/teams/5924/project/design/defig10.webp)

    ^2.2.3 Gene knockout for signal optimization^
    As forementioned, we knocked out the *STE12* and *GAL4* for the replacement of sTF, and knocked out the *FAR1* to maintain the regular cell cycle. Moreover, we needed to knock out *GAL80*, which is responsible for the expression of galactose metabolism regulatory protein GAL80 (GAL80), for continuous activation of GAL4. Through this we did not need to use galactose as the inducer (Figure 11).

    ![Figure 11 The engineering modification of Substrate-acting Strain.](https://static.igem.wiki/teams/5924/project/design/defig11.webp)

# 3 The technology promotion

    + ^3.1 The Vacuum Freeze-Drying Process for Yeast Powder^

    As a traditional chassis organism of synthetic biology, *S. cerevisiae* has an additional advantage. There is a fairly mature process named Vacuum Freeze-Drying Process for Yeast Powder, which largely extend the shelf life of yeast products. Yeast powder obtained by low-temperature vacuum drying with an appropriate concentration of trehalose can maintain good activity (the revival rate exceeds 60%), with a shelf life of 6-12 months at room temperature and 2-3 years in a frozen state$^8$. Through this process, the costs of our engineered strain’ s transportation, storage and even large-scale production will be largely reduced, which is beneficial for our products’ commercialization. And we could even design a detection kit based on the yeast powder. Just mix the 2 different strains with a specific ratio and process them into yeast powder. When use, revive the yeast in the powder with yeast rehydration solution and add the sample treated with the buffer, just wait for the color shift to get the result. We planned to prepare a color chart based on the empirical equation for common customers, and for precise quantification like medical products’ quality inspection and medical diagnosis, a spectrophotometer could be applicable.

    + ^3.2 Paper-based dipstick assay for detection of BoNT/A^

    For rough detection, we also designed a paper-based dipstick assay (Figure 11). To assemble the dipstick, the strains should be precultured in 50 ml of YPD medium at 30°C at 300 rpm for 72 hours. The culture is diluted with water to an OD600 of 2.5 and vacuum-filtered onto a glass fiber filter paper using a plastic stencil to generate spots with a diameter of 5 mm. An appropriate culture volume is used to give about 5 × 107 cells per spot. The filter paper with biosensor spots is cut into small squares (8 mm × 8 mm, one biosensor spot) and placed onto a strip of wicking paper made of a standard brown paper towel. Each paper-based dipstick assay contains two different spots, an indicator (biosensor) spot and a control spot composed of *S. cerevisiae* carrying an off-target receptor as a negative control. Biosensor and control cells are spotted onto filter paper, and detection will be performed by simply dipping the paper into liquid samples that might contain BoNT/A$^4$.

    ![Figure 12 The designed paper-based dipstick assay. $^4$](https://static.igem.wiki/teams/5924/project/design/defig12.webp)



# References

1	Li, Y., Wang, X., Zhou, N.-Y. & Ding, J. Yeast surface display technology: Mechanisms, applications, and perspectives. Biotechnology Advances 76, 108422 (2024). 

2	Chen, S. & Barbieri, J. T. Unique Substrate Recognition by Botulinum Neurotoxins Serotypes A and E. Journal of Biological Chemistry 281, 10906-10911 (2006). 

3	von Berg, L. et al. Optimization of SNAP-25 and VAMP-2 Cleavage by Botulinum Neurotoxin Serotypes A–F Employing Taguchi Design-of-Experiments. Toxins 11, 588 (2019). 

4	Ostrov, N. et al. A modular yeast biosensor for low-cost point-of-care pathogen detection. Sci Adv 3, e1603221 (2017). 

5	Fan, C., He, N. & Yuan, J. Cascaded amplifying circuit enables sensitive detection of fungal pathogens. Biosensors and Bioelectronics 250, 116058 (2024). 

6	Grewal, P. S., Modavi, C., Russ, Z. N., Harris, N. C. & Dueber, J. E. Bioproduction of a betalain color palette in Saccharomyces cerevisiae. Metabolic Engineering 45, 180-188 (2018). 

7	DeLoache, W. C. et al. An enzyme-coupled biosensor enables (S)-reticuline production in yeast from glucose. Nature Chemical Biology 11, 465-471 (2015). 

8	Ya-Fen, W. Study on Inherent Mechanism of Lyophilization Resistance of Saccharomyces Cerevisiae. FOOD SCIENCE 21, 10-12 (2000).

9   Jumper, J. et al. “Highly accurate protein structure prediction with AlphaFold.” Nature, 596, pages 583–589 (2021).
