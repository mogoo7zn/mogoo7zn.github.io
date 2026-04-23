# 1. The Generation of the Project

+ ^1.1 A Cruel Detection Method^

    We initially came up with this project Selective Proteolytic Botulinum Toxin Bioassay Based on Yeast (S.P.Y.) was when a team member saw a reposted webpage from an animal protection association called One Voice on the mobile advisory platform $^1$. On the webpage prominently wrote “SCANDALOUS RECORD: 400,000 ANIMALS TORTURED EACH YEAR TO TEST BOTULINUM TOXIN IN EUROPE” in large characters, which was eye-catching and shocking. In the mouse bioassy, the model mice are injected with samples containing BoNT/A and observed the syptoms of botulism. During this process, the mice will suffer a lot and die of respiratory muscle paralysis. Then as our understanding of the BoNT/A detection deepened, we were informed that the MBA has been the “golden standrad” in the industry and no alternative available in most of the cases. For this reason just in Europe and North America about 600,000 mice will die of this detection per year $^2$ and the number will farly surpass that globally. The expectiation of improving this cruel method firstly drew our attention to this project.

+ ^1.2 A Lethal Toxin^

    Considering the huge consumption volume of mice for detecting BoNT/A, can we quit the toxin detection? The answer is absolutely NO! The detection of BoNT/A is necessary for people’s health and safety cause for a series of reasons. Firstly, BoNT/A is the most lethal toxin human ever known and about 50ng is enough to kill an adult $^3$. With no detection method of this toxin, many cases of botulism caused by iatrogenic and foodborne factors may break out. Secondly, botulism is not that far away from us. The spores of *Clostridium botulinum* are widely distributed in the rivers, soils, vegetables, meat products and even processed food, which are the main causes of infant and foodborne botulism. Thirdly, the medical and market value of BoNT/A are being continuously uncovered with the medical aesthetics industry boosting, so the detection demands are surging. We gradually realized the value of the detection of BoNT/A and it would be meaningful to improve the traditional method, which would make a contribution to human health and animal welfare cause.

# 2. Concerns in Design

+ ^2.1 The Signal Amplification Capability^

    When it comes to a detection system, the primary considerations are the precision and the sensitivity. Besides a perceivable signal input and distinct signal output, the signal simplification inside the system also determines the overall efficiency of the detection. In the selection of our chassis organism and the signaling pathway modification we both took this into consideration. We utilized the natural G Protein-Coupled Receptor (GPCR)Signaling Pathway of *Saccharomyces cerevisiae* for the signal amplification. We also coupled this pathway with the Galactose Operon Regulatory System (GRS) to achieve a more obvious and higher-purity signal output $^4$ (Figure 1).

    ![Figure 1 The diagram of the signal amplification system.]( https://static.igem.wiki/teams/5924/project/design/defig7.webp)

+ ^2.2 Verification of a Safer Alternative^

    BoNT/A is a highly dangerous toxin which can cause botulism through oral ingestion, inhalation and wound infection. And according to the Regulation on the Administration of Biosafety of Pathogenic Microbiology Laboratories—China’s foundational statute for laboratory biosafety management—in vivo active botulinum toxin A(BoNT/A) may be handled only in a BSL-3 (or higher) facility to guarantee personnel safety. For the safety of laboratory personnel, we designed a safer verification experiment as the alternative one. We inserted the TEV protease recognition sequence (TEVcs: ENLYQG) at the terminus of SNAP-25 and used the enzymatic activity of TEV protease as the input signal. Through this way we avoided the use of lethal BoNT/A (Figure 2).

    ![Figure 2 The fusion protein inserted into TEVcs.](https://static.igem.wiki/teams/5924/project/design/defig3.webp)

+ ^2.3 Genetic Safety^

    Although our target was building an enclosed detection system, we were still serious about genetic contamination caused by improper leakage. For biosafety we used Dual Safeguards- Arabinose-repressed Suicide System (Figure 3) and Auxotrophic Strategy. When our engineered yeasts were leaked into the natural environment, their detachment from the environment with high concentrations of methionine and arabinose would render them incapable from survival. 

    ![Figure 3 The Arabinose-repressed Suicide System.](https://static.igem.wiki/teams/5924/safety/fig1.webp)

# 3. Feasibility Analysis

+ ^3.1 The Concerns of False Positives^
    Based on the mechanism of α-factor, we were informed that α-factor does not exhibit significant specificity among different strains of the same species of *S. cerevisiae*. For this reason, strong false positives might occur in our dual-yeast detection system when detecting foods fermented by yeast, which can express α-factor. And we conducted feasibility analysis over this issue. Fortunately, it is proved that *C. botulinum* can not survive in the environment with a pH<4.6, even can survive it won’ t produce toxins $^5$.And the general pH of yeast metabolic environment is 4-6, making the probability of toxin presence extremely low. And there is hardly any relevant report about botulism caused by yeast-fermented food with no fermentation failure or inadequacy. Our system’ s usage of food safety detection was still wide.

+ ^3.2 The Influence of the Excess Residues^

    In our project design, due to the specificity of the botulinum toxin cleavage site, the α-factor released upon botulinum toxin cleavage of the SNAP25 protein retains a segment of amino acid residues at its C-terminus. To assess whether this C-terminally truncated α-factor can properly bind to its receptor, and to explore potential improvements to the experimental plan, we performed modeling to analyze both the cleavage efficiency and binding efficiency of α-factor with varying lengths of C-terminal extensions (corresponding to different SNAP25 mutants). And according to the model we have found that best cleavage site, and the cleavage efficiency and the binding ability were reasonably satisfied, making the further experimental verification feasible. (Figure 4,5,6)

    ![Figure 4 Activation energy calculation results, representing a relative measure of cleavage efficiency.](https://static.igem.wiki/teams/5924/drylab/cleavage.webp)
    ![Figure 5 Docking results of BoNT/A with SNAP-25 variants.](https://static.igem.wiki/teams/5924/drylab/snap-25.webp)
    ![Figure 6 Docking results of cleavage products with Ste2 receptor.](https://static.igem.wiki/teams/5924/drylab/ste2.webp)

+ ^3.3 The Influence of the Shed Fusion Protein^

    Since our fusion protein was anchored extracellularly by Pir1p part, we sought to determine whether its anchoring efficiency might impact our expected outcomes. If the anchoring efficiency is low, the potential detachment of the fusion protein could lead to uncleaved fusion proteins binding to the receptor, resulting in false positive signals.

    We employed a combined approach of ODE equations and molecular dynamics simulations to exclude potential false-positive interference caused by shed fusion proteins. The results indicate that the probability of fusion protein shedding is very low, and any shed proteins are incapable of binding to the membrane-localized Ste2 receptor on the signal-transferring strain.The possibility of false positives resulting from this approach has been ruled out. (Figure 7)

    ![Figure 7 Simulation of fusion protein shedding.](https://static.igem.wiki/teams/5924/drylab/resuscitation-stage.webp)

# 4. The Diagram of Building Process

    In our project, we built two strains the Substrate-acting Strain and the Signal-transferring Stain to develop the detection system. And the building process is as followed (Figure 8).

    ![Figure 8 The Diagram of Building Process, the part marked by light-yellow  is what to be done in wet lab.](https://static.igem.wiki/teams/5924/project/implementation/pifig8.webp)

# 5. The Works to be Completed

+ ^5.1 The Wet Lab Part^

    So far, we have completed all the plasmid construction and basically built up the system. The pigment expression module of Signal-transferring Strain was proved to be feasible and the result was ideal. We have also conducted some preliminary experiments for extraction of yeast cell wall proteins for the verification of fusion protein expression of Substrate-acting Strain. But as mentioned above, due to time limit we did not complete all the verification experiments.

    ^5.1.1 The Verification of the Signal Amplification System’ s Activation^

    We have used galactose to trigger the pigment batalamic acid expression before transferring the *sTF* into the Signal-transferring Strain, which was proved to be ideal. And in the next days we will trigger Signal-transferring Strain by α-factor (with different cleavage residue length) to verify the feasibility of the Signal Amplification System’ s Activation.

    ^5.1.2 The Verification of the Fusion Protein Expression^

    In the next days we will extract and purify the fusion protein on the Substrate-acting Strain’ s cell wall. If we get positive results, we will use TEV protease to treat the strain and collected the cleaved fusion protein (released α-factor). And the collected protein will be used to trigger the Signal-transferring Strain, from which we observed whether the pigments are expressed.

    ^5.1.3 The Whole-Process Simulation^

    After we verify the feasibility of the two strains separately, we will place them in the same system and treat them with TEV protease to see whether the pigments are expressed, which directly verifies the detection capability of our dual-yeast system. And control experiments will be conducted to acquire data to establish the empirical equation of toxin-solution absorbance and the optimal mixing ratio of the two strains.

+ ^5.2 The Dry Lab Part^

    ^5.2.1 Adjustment of the Modeling Parameters^

    We have obtained the empirical equation of toxin-solution absorbance and the optimal mixing ratio of the two strains based on some parameters in related articles. In the future we will further calibrate the parameters based on experimental data.

    ^5.2.2 Online Modeling Platform^

    After establishing the model, we simultaneously initiated further research and investigations. It was noted that our algorithm shares similarities with the algorithm of the existing modeling software COPASI. However, COPASI has shortcomings such as a high learning curve, relatively complex understanding, poor cross-platform compatibility, limited customizability, and complicated visualization and interactive experience. Meanwhile, to facilitate the dissemination of our achievements both within and outside the team, and to enable the rapid and intuitive demonstration of product effects to users, we also strived to build a web platform. This platform not only serves as a model demonstration platform, but also, thanks to its ability to flexibly add or delete nodes and edges as well as their relationships, is expected to fill the gap in the team's future needs for a learning and rapid experiment platform for biological system modeling.

# 6. The Future Plan

In the longer-term future, we expect to promote our detection method by designing two detection kits based on the demand for precision, targeting both professional testing institutions and ordinary people. And the usage scenarios include medical products quality testing, food testing and medical diagnosis.

The first kit includes a 6-well plate (or 96-well plate for higher-throughput detection), yeast powder (mixed with the substate and antioxidants), yeast rehydration solution and buffer. When detecting BoNT/A, first mix the powder with the rehydration solution in a certain proportion and add the mixture into the plate, and then treat the samples with buffer, take the supernatant and add it into the plate. Wait for a while, the color change will qualitatively confirm the presence of botulinum toxin. And several hours later the pigment expression will be stable, when customers can use spectrophotometer for quantitative detection. (Figure 9)

![Figure 9 The kit for quantitative detection.](https://static.igem.wiki/teams/5924/project/implementation/pifig9.webp)

The second kit includes a dipstick (which contains our mixed strains) and buffer. Just add the samples into the buffer and dip the dipstick into the solution. Wait for a while, the color change will qualitatively detect the BoNT/A, and our customers can compare it with the color chart we provide to better estimate the concentration of the toxin. (Figure 10)

If the efficiency of detection is great, we expect to connect related manufacturer to commercialize our product, hoping to make a contribution to human health and animal welfare cause and enable people to better grasp the dual-sided role of BoNT/A.
![Figure 10 The kit for qualitative detection.](https://static.igem.wiki/teams/5924/project/implementation/pifig10.webp)



# References

1	Scandalous record: 400,000 animals tortured each year to test botulinum toxin in Europe, (2018).
Web:https://one-voice.fr/en/news/scandalous-record-400-000-animals-tortured-each-year-to-test-botulinum-toxin-in-europe/?use_xbridge3=true&loader_name=forest&need_sec_link=1&sec_link_scene=im&theme=light

2	Taylor, K. Botulinum toxin testing on animals is still a Europe-wide issue. Altex 36, 81-90 (2019). 

3	Monash, A., Tam, J., Rosen, O. & Soreq, H. Botulinum Neurotoxins: History, Mechanism, and Applications. A Narrative Review. Journal of Neurochemistry 169, e70187 (2025). 

4	Fan, C., He, N. & Yuan, J. Cascaded amplifying circuit enables sensitive detection of fungal pathogens. Biosensors and Bioelectronics 250, 116058 (2024). 

5	Glass, K. & Marshall, K. Clostridium botulinum. Foodborne Infections and Intoxications, 371-387 (2013). 
