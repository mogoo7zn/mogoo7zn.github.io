# 1. Project

BoNT/A is the most lethal toxin human ever known$^1$, and the spores of the toxin-producing bacteria *Clostridium botulinum* are widely distributed in rivers, soils and many household foods. Due to the boost of medical BoNT/A for injection in medical aesthetics, the Cosmetic Iatrogenic Botulism (CIB) are becoming more common. Nowadays the primary detection method of BoNT/A is the Mouse Bioassay (MBA), which consumes about 400,000 mice in EU per year$^2$ (Figure 1). Besides the Animal Ethnic Issues, the MBA has several drawbacks like costly, time-consuming and lacking in uniform standards. The overall detection of botulinum toxin exhibits low efficiency and reliability. Considering this situation, we came up with the project Selective Proteolytic Botulinum Toxin Bioassay Based on Yeast (S.P.Y.) and built a dual-yeast detection system which could quantitively and rapidly detect the active BoNT/A in a series of usage scenarios.

![Figure 1 The usage distribution of mice for regulation uses $^2$](https://static.igem.wiki/teams/5924/hp/contribution/themba.webp)

+ ^1.1 Food Safety^

    Our detection method features simple operation-just mix the yeast powder treated by rehydration solution with the samples treated by buffer, so it is convenient for common people to test the edibility of household food like canned food, meat products and fermented food. The BoNT/A detection for food is no longer limited to professional institutions and everyone is able to carry out point-of-care testing with our method.

+ ^1.2 Medical Diagnosis^

    Every year about 1,000 cases of botulism are reported (and based on estimates the actual number is far beyond that). The medical diagnosis of botulism is testing the fecal or plasma samples of suspected infected individual based on the MBA. The long detection cycles (4-6 days$^3$) and the lack of immediate diagnosis usually result in a high rate of severe botulism cases. Our method exhibited higher sensitivity and shorter detection time, which is beneficial to the diagnosis of botulism and thus enables patients to receive timely treatment.

# 2. Wet Lab

+ ^2.1 A Laboratory Animal-Friendly Method^

    Compared with the traditional MBA, our yeast-based detection method is much more laboratory animal-friendly. Depending on the Substrate-acting Strain and the Signal-transferring Strain, we simulated the process of BoNT/A cleaving SNAP-25 and achieved a sensitive signal output. It shared the same basic principle as the MBA and achieved equivalent efficacy. We can save several hundred thousand mice globally every year if our detection method gets promoted widely, which responses to the trend of non-animal test and will make a great contribution to the animal welfare cause.

+ ^2.2 A Safe Method^

    Our method had dual safeguards for prevention of genetic contamination when improper leakage happens. Primarily, we designed an arabinose-repressed suicide system to construct the arabinose dependence of the engineered strains, which exhibited a very low escape rate based on the existing research $^4$$^,$$^5$. And the toxin protein K1 in the system is non-pathogenic to mammal cells$^6$, which indicates the biosafety of this suicide system. Secondarily, the two strains in the system all retained methionine auxotrophy, which made it hard for them to survive in normal circumstances.

+ ^2.3 Problem Shooting^

    During the experiments, we made some empirical summaries for the errors and problems we encountered. We list them there, hoping to be helpful for the future teams. 

    ^1. Overlap method for short fragment amplification^: 

    In the construction of fusion protein plasmids, common methods for fusing gene sequence fragments of various proteins include restriction enzyme digestion-ligation, recombinase-mediated recombination, and Gibson Assembly. Restriction enzyme digestion-ligation is effective but low-efficient, while the latter two are more frequently used. However, in practice, handling relatively short fragments (e.g., 100-odd bp or several dozen bp) is inconvenient, both in their extraction and amplification and during recombination. In our experiment, amplifying the target TEVcs-α-factor fragment (80 bp) showed extremely low efficiency due to its small size. Moreover, this fragment was accidentally degraded by DNA exonuclease in the system during subsequent Gibson Assembly; meanwhile, recombinases only capable of single-fragment recombination were ineffective here.
    
    Under such circumstances, single-strand annealing extension and overlap PCR proved useful. Our TEVpcs-α-factor fragment was obtained via annealing extension of two 52 bp primers with overlapping regions in the PCR system, followed by amplification, achieving good yield. In the subsequent Gibson Assembly for target plasmid construction, we used overlap PCR to connect the SNAP-25 fragment (192 bp) and TEVpcs-α-factor fragment (80 bp) by virtue of the 17 bp homology arms originally designed on both sides of the two fragments, and the subsequent experiments were successfully conducted.

    This indicates that for fragments shorter than 200 bp, overlap PCR provides a simple, rapid, and accurate method for single-fragment ligation. We hope the overlap PCR method tested in our experiment can offer some ideas and inspiration for future research teams.

    ^2. Precautions for using L-DOPA^:

    To preliminarily verify the feasibility of pigment synthesis, we transformed the plasmid pYES2-PGAL1-MjDOD-CYC1 into yeast, then attempted to induce the expression of MjDOD enzyme using galactose and added a certain amount of L-DOPA to the culture system. However, the initial several attempts yielded unsatisfactory results, as the yeast culture consistently turned black.
    
    Through literature research and analysis, we found that although solid L-DOPA is thermostable, it is prone to oxidation in aqueous solutions under high temperatures, eventually converting into melanin. Additionally, L-DOPA has extremely low solubility in water. Although L-DOPA exhibits higher solubility in acids, this approach was abandoned considering the potential significant impact of acids on the pH of the yeast culture medium. Finally, we assumed that the amount of miscellaneous bacteria in solid L-DOPA was negligible; thus, we directly added unsterilized L-DOPA to the medium and supplemented it with ascorbic acid to further inhibit L-DOPA oxidation. This optimization resulted in a significantly improved pigment synthesis efficiency, and no miscellaneous bacteria were observed in the blank medium (medium without yeast inoculation).
    
    We also explored alternative strategies to better address this issue, such as dissolving L-DOPA in acid followed by filter sterilization, and adjusting the medium pH to an appropriate range with a suitable base after adding the sterilized L-DOPA solution.
    
    The final composition of the culture medium was as follows: SC medium, 2% galactose, 1 mM L-DOPA, and 10 mM ascorbic acid. The culture conditions were set as 28°C, 250 rpm, and cultivation with gas-permeable sealing film.

    ^3. Yeast cultivation^:

    In the initial stage of yeast cultivation, Erlenmeyer flasks were used as culture vessels. The flasks were first sealed with tin foil and sterilized in an autoclave. Subsequently, approximately 50 mL of culture medium inoculated with yeast suspension was added to each flask in a biosafety cabinet, and the flask mouths were secured with rubber bands before being placed in a yeast shaker for cultivation.
    
    During this phase, frequent microscopic examinations revealed that the yeast cultures were contaminated with miscellaneous bacteria. A blank medium control was set up to rule out contamination from other equipment, leading us to conclude that the poor sealing performance of the tin foil was the cause of the contamination.
    
    Thereafter, the culture vessels were replaced with culture tubes, each containing approximately 6 mL of bacterial suspension. Although this modification reduced the yield of yeast per batch, it effectively resolved the miscellaneous bacterial contamination issue. Meanwhile, we also purchased tissue culture sealing films to prepare for potential large-scale cultivation in subsequent experiments. And it really played a role in yeast aerobic expression.

    ^4. Colony PCR Protocol for Saccharomyces cerevisiae Strain BY4741^
    
    a. Reagent Preparation
    
    10× Lysis Buffer: Dissolve 0.16 g NaOH in 20 mL sterile water.

    Dilute 1:10 with sterile water before use (final concentration: 0.02 mol/L, 10 μL per tube).

    Concentrated Yeast Suspension: Scrape ~1 cm² yeast lawn from a dense plate, resuspend in 20 μL sterile water.

    Neutralization Buffer: Tris-HCl buffer (pH 6.8).

    PCR System (50 μL total): 20 μL ddH₂O, 2 μL forward primer, 2 μL reverse primer, 1 μL treated lysate, 25 μL Vazyme Rapid Taq Master Mix.
    
    b. Yeast Lysis & Post-treatment
    
    1. Add 1 μL concentrated yeast suspension to each lysis buffer tube; heat at 95°C for 15 min.

    2. Post-treatment groups (per tube):Control: No treatment.; Neutralization: Add 5 μL Tris-HCl (pH 6.8);  (Optional) Neutralization + Centrifugation: Add 5 μL Tris-HCl (pH 6.8), then centrifuge at room temperature for 1 min (palm centrifuge).
    
    c. PCR Amplification
    
    Program: 95°C (3 min, pre-denaturation) → 30 cycles of 95°C (15 s, denaturation), 61°C (15 s, annealing), 72°C (30 s, extension) → 72°C (5 min, final extension).
    
    d. Detection
    
    Mix 4.5 μL PCR product with 0.5 μL loading buffer (with Gel Red); run agarose gel electrophoresis (80 V) with 100–5000 bp DNA marker. Visualize via gel imager.
    
    Key Note
    
    Neutralization with Tris-HCl (pH 6.8) is critical for reliable PCR results; centrifugation for debris removal is optional.

+ ^2.4 Multiple New Parts ^

    ^1.	Marker gene^: We used URA3 marker gene in the construction of the several plasmids, which exhibited great selection function. The future teams can use this basic part for selective cultivation of the target yeast strain based on the information we provided. (For detail information please search for BBa-25JA50EQ)

    ^2.	Fusion protein^: We designed fusion protein Pir1p-SNAP-25-α-factor, of which the corresponding part was pYES2-PGAL1-Pir1p-SNAP25-(TEV)-Mating factor alpha-CYC1. This part utilized yeast cell surface display technology and the ligand activation ability of α-factor, which could serve as an example of an enzyme activity assay platform anchored to the cell wall. This part has reference value for future teams. (For detail information please search for BBa-253UM26D)

    ^3.	Synthetic transcription factor (sTF)^: We designed a sTF by binding the Gal4 DBD to Ste 12 PRD, which could couple GPCR signaling pathway to GRS thereby achieving efficient signal amplification. This part might be used in more signal amplification system. (For detail information please search for BBa-25RUA0B9)


# 3. Human Practices

+ ^3.1 Biology Education Classes for the Autism Community^

    Children with autism are a special group of concern in society, often referred to as "children from the stars." For a long time, USTC iGEM team has maintained active cooperation with a local autism school, regularly arranging for team members to visit the school and conduct biology-related courses for children with autism. For example, after thorough preparation, we conducted an experiment for special education students, sparking their interest in learning and demonstrating care for special groups in need. This initiative also received unanimous recognition from community residents and special education teachers, promoting societal attention to the educational needs of children with autism. At the same time, we have also encouraged more social forces to participate in special education, promoting educational equity and social welfare and spreading positive social energy.

    ![](https://static.igem.wiki/teams/5924/hp/special-education/paint.webp)

    ![Teaching Guide for Science Education Classes for the Autism Community](https://static.igem.wiki/teams/5924/hp/special-education/guide.webp)

    The USTC iGEM team collaborated closely with Nanjing University, gaining practical experience by designing a series of science activities specifically for children with autism, focusing on synthetic biology. Through hands-on activities like making dough and balloon models, we helped the children deepen comprehension and interest in biology. This guidance's positive impact is mainly reflected in two aspects: firstly, it provides autism children with the opportunity to learn about cutting-edged science, nurturing their abstract mindset and social skills; secondly, it explores a new model for combining science popularization with autism education, providing valuable references for broader social forces to participate in the education of special children.

    https://static.igem.wiki/teams/5924/hp/test/.pdf

    (Use the website to view the complete guide)

+ ^3.2 Interview with Qingsong Food^

    The iGEM team of USTC cooperated deeply with the largest local fast food processing and distribution company, Qing Song Food. We visited the workshop and learned about the production and quality inspection processes of daily food. In a professional laboratory, we interviewed the director of the quality inspection department to explore the potential of botulinum toxin testing in commercial applications. This opportunity enabled us to transform experimental results into practical applications and to know more of consumers’ requirements, providing a brand-new academic perspective into the broader technological development in the realm of food industry.

    ![](https://static.igem.wiki/teams/5924/hp/contribution/qingsong-food1.webp)

    ![Team members are interviewing Qingsong Food Processing Plant](https://static.igem.wiki/teams/5924/hp/contribution/qingsong-food2-png.webp)

    ![Certification of Grain Egergency Support Enterprises of Qingsong Food](https://static.igem.wiki/teams/5924/hp/contribution/qingsong-food4.webp)


+ ^3.3 Interview with Guotai Zhongxin^

    Guotai Zhongxin is a national-level third-party testing enterprise, mainly responsible for chemical & biological testing in the food production process and other related technology. Its testing field includes pesticide residues, microbial contamination, heavy metals, etc. During the contact between the USTC iGEM team and one of the enterprise's leaders, we identified market gaps and technical challenges in botulinum toxin detection. Subsequent innovation and improvement are bound to be able to fill industry technology voids specifically, helping to enhance the accuracy of food testing categories. This not only triggered technological progress in the food testing field by building a bridge between academia and industry, but also reduced food safety risks from a supervisory aspect.

    ![](https://static.igem.wiki/teams/5924/hp/contribution/guotai-zhongxin2.webp)

    ![Team members are interviewing food testing institution Guotai Zhongxin](https://static.igem.wiki/teams/5924/hp/contribution/guotai-zhongxin3-png.webp)


+ ^3.4 The USTC Science and Technology Week^

    he USTC Science and Technology Week is a heated public annual   event that combines science education with fun experiments, aimed at primary and secondary school students and families nationwide. Various departments and student organizations have the opportunity to set up booths and design games to achieve the goal of popularizing science to the public. As one of the most active and professional student organizations, the USTC iGEM team hosted two activities: a biological knowledge quiz and a themed lecture on human systems. As one of the most notable subject in 21st century, synthetic biology captured the attention of countless young students. The team members explained its fundamental principles in the most engaging and accessible way, while also providing an encouraging outlook on its vast potential. This successfully broke down the "professional barriers" of synthetic biology, allowing a broader segment of society to understand this emerging field, sparking teenagers' interest in life sciences, and cultivating potential talent for future research. At the same time, this activity enhanced our mutual passion for science, exploration, and innovation, having positive effects on the social atmosphere.

    ![](https://static.igem.wiki/teams/5924/hp/contribution/science-and-technology-week1-png.webp)

    ![Team members are carrying out science popularization activities during Science and Technology Week](https://static.igem.wiki/teams/5924/hp/contribution/science-and-technology-week2.webp)

+ ^3.5 Bio-bounce -- a platformer game ^

    We collaborated with team Fudan and NUDT-CHINA  to create the Bio-Bounce synthetic biology mini-game. Our team was mainly responsible for the conception and overall implementation of the game mechanics of "Bio-Bounce". We designed a simple yet attractive gameplay, integrating relevant concepts of gene editing in synthetic biology, and embedding the scientific core into the gaming experience, enabling players to understand the process of gene acquisition and editing through fun operations. Through this creative form, we not only demonstrated the application potential of synthetic biology but also helped to reduce the public's sense of distance and doubts about emerging technologies, making the game a scientific communication medium suitable for all age groups.

    ![The science popularization mini-game](https://static.igem.wiki/teams/5924/hp/contribution/bio-bounce.webp)



# References

1	Monash, A., Tam, J., Rosen, O. & Soreq, H. Botulinum Neurotoxins: History, Mechanism, and Applications. A Narrative Review. Journal of Neurochemistry 169, e70187 (2025). 

2	Middelkoop, J. Towards Cruelty-free Botulinum Toxin Testing: Current Situation and Roadblocks Utrecht University, (2024).

3	Hobbs, R. J., Thomas, C. A., Halliwell, J. & Gwenin, C. D. Rapid Detection of Botulinum Neurotoxins—A Review. Toxins 11, 418 (2019). 

4	Guo, S., Du, J., Li, D., Xiong, J. & Chen, Y. Versatile xylose and arabinose genetic switches development for yeasts. Metabolic Engineering 87, 21-36 (2025). 

5	Gong, X. et al. Architecting a transcriptional repressor-based genetic inverter for tryptophan derived pathway regulation in Escherichia coli. Metabolic Engineering 86, 66-77 (2024). 

6	Salek, A. T. The influence of yeast killer toxins on the cytotoxicity of shiga-like toxins. Part I - The effect of killer toxins on mammalian cells. biotechnologia 1, 244-256 (2003). 
