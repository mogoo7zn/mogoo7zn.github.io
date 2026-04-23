# Iteration 1: The Construction of Signal-Transferring Strain

^Cycle 1.1 The Construction of Related Plasmids^

^Design^

 The Signal-transferring Strain in the detection system was responsible for the signal amplification and output after capturing the signal of released α-factor. And the construction of this strain was more complicated in genetic modification. To modify the GPCR signaling pathway of BY4741, we should transfer the synthetic transcription factor (sTF) into the strain and knock out its *GAL4* and *GAL80*. For stability of the system and the purity of the signal, we should knock out its *FAR1*. For the pigment expression, we should enable the strain to express MjDOD, which. For the intention above we designed pUC19-*sTF*, pUC19-*GAL4*-*URA3*，pUC19-*GAL80*-*HIS3*，pUC19-*FAR1*-*URA3* and pYES2-PGAL1-MjDOD-CYC1. Except for pUC19-*sTF*, each plasmid contained donor fragment composed of a yeast auxotrophic marker gene, and there were homologous sequences of 400-500 bp on each side of the gene to be knocked out for yeast’ s homologous recombination. (Figure 1,2)

![Figure 1 The plasmid map of pUC19-*sTF*.](https://static.igem.wiki/teams/5924/project/engineering/peffig1.webp)

![Figure 2 The plasmid maps of pUC19-*GAL4*-*URA3*，pUC19-*GAL80*-*HIS3*，pUC19-*STE2*-*URA3*，pUC19-*FAR1*-*URA3*.](https://static.igem.wiki/teams/5924/project/engineering/pefigg2.webp)
 
^Build^

 To build these plasmids, we conducted secondary plasmid construction. We conducted the linearization of the vectors, the PCR amplification of all the gene of interest and plasmid assembly to obtain pUC19-*STE12*, pUC19-*GAL4*, pUC19-*FAR1*, pUC19- *GAL80*. And we linearized the above plasmids via inverse PCR and inserted the marker gene (for the construction of pUC19-*sTF* we inserted the *GAL4*(DBD) to obtain pUC19-*sTF*, pUC19-*GAL4*-*URA3*, pUC19-*GAL80*-*HIS3*, pUC19-*FAR1*-*URA3*. For the construction of pYES2-PGAL1-MjDOD-CYC1, we obtained *MjDOD* gene from pUC57-*MjDOD* plasmid, and inserted it into the expression cassette of pGR420-PGAL1-CYC1 plasmid (we did not use pYES2 because of issues encountered in vector linearization, so we inserted its promoter GAL1 and terminator CYC1 into pGR420) to get pGR420-PGAL1-*MjDOD*-CYC1 plasmid. All of the plasmids were successfully constructed and transferred into *E. coli* through several attempts.

^Test^

 We conducted colony PCR over these plasmid-containing *E. coli* and got positive results. To further confirm the successful construction, we performed Sanger sequencing and for most of the plasmids the results were ideal. For pGR420-PGAL1-*MjDOD*-CYC1, we were surprised to find its sequence was consistent with that of the pYES2-PGAL1-*MjDOD*-CYC1, which we designed first. Fortunately, this unexpected issue did not impact on our outcomes (Figure 3).

![Figure 3 The sequencing map of the plasmids above.](https://static.igem.wiki/teams/5924/project/engineering/pefig3.webp)

^Learn^

 Tackling the issues in this cycle, we gained experience in primer design and learned to design yeast gene knockout plasmids utilizing yeast homologous recombination. In face of the issues in the pYES2-PGAL1-*MjDOD*-CYC1’ s construction, we strengthened the cultivation of our experimental management and attribution capabilities.

^Cycle 2.1 The Transformation of Competent Yeast^

^Design^

To knock out the *FAR1*,*GAL4*,*GAL80* and transfer the *sTF* into the yeast, we should transfer related fragment amplified from the plasmids; to enable our strain to express MjDOD for pigment expression module, we should transfer the related plasmid into the yeast.

^Build^

 For yeast transformation, we used the lithium acetate transformation method to prepare competent yeast cells (for more details are involved in Protocol), and transferred related plasmids or fragments amplificated into the competent yeast. Before this process, we should cultivate the yeast until the absorbance was between 0.6-1.2. We plotted the growth curves of yeast in different media (Figure 4).


![Figure 4 The yeast growth curves.](https://static.igem.wiki/teams/5924/project/engineering/pefig4.webp)

^Test^

 No colony grew on the petri dish until the third day. Some white, smooth and irregular colonies appeared on the petri dish. Unfortunately, we found that the colonies were composed of contaminating bacteria through microscopic examination (Figure 5). The first trial of the transformation was failed.

![Figure 5 The microscopic examination of the colony.](https://static.igem.wiki/teams/5924/project/engineering/pefig5.webp)

^Learn^

 We encountered contaminating bacteria pollution in this cycle. We analyzed the aseptic operation throughout the entire process and also conducted control experiments on experimental instruments and reagents to investigate whether the contamination was caused by reagent pollution. In the next cycle we would pay much more attention to this issue.

^Cycle 2.2 The Exploration of Competent Yeast Preparation^

^Design^

 To find out the contamination source we designed control experiments over factors about our clean bench, the petri dish and reagents for competent yeast preparation.

^Build^

In these trials, we separately added some extra steps. 1. Conducting the whole process in the clean bench except for centrifugation; 2. Add different antibiotics into the petri dish; 3. Using the membrane filter sterilization method to treat the polyethylene glycol solution and the lithium acetate solution, boiling the salmon sperm in a water bath. The other operations stayed the same.

^Test^

In the first 2 trials, bacterial lawn and even hyphae appeared in the petri dishes just one day later, which was an obviously abnormal result. In the third trial, white and regular colonies appeared 3 days later and they were yeast colonies according to microscope examination. It turned out that the contamination source was the salmon sperm. Based on the previously established operating standards and experimental experience, we succeeded in the yeast transformation (Figure 6,7,8,9,10).

![Figure 6 The results of yeast colony PCR-sTF.](https://static.igem.wiki/teams/5924/project/proofofconcept/stf-only.webp)

![Figure 7 The results of yeast colony PCR-GAL4.](https://static.igem.wiki/teams/5924/project/proofofconcept/gal4-only.webp)

![Figure 8 The results of yeast colony PCR-GAL80.](https://static.igem.wiki/teams/5924/project/proofofconcept/gal-80.webp)

![Figure 9 The results of yeast colony PCR-MjDOD.](https://static.igem.wiki/teams/5924/project/proofofconcept/mjdod.webp)

![Figure 10 The results of yeast colony PCR-STE2(Substrate-acting Strain).](https://static.igem.wiki/teams/5924/project/proofofconcept/ste-2.webp)

^Learn^

This issue made us more serious about the unlikely factors. We would not have found out the contamination source, which was boiled when preparing ssDNA and not easily suspected, if we had not tried it before.

^Cycle 3.1 The Verification of Pigment Expression^

^Design^

 After basically constructing the Signal-transferring Strain (the *sTF* had not been transferred into it and *GAL4* had not been knocked out yet when we did this verification experiment), we should firstly verify the pigment expression module-whether our strain could express MjDOD and further catalyze its conversion to betalamic acid.

^Build^

 We cultivated the strain for 48 hours in synthetic glucose (SG) liquid medium, which contained L-DOPA.

^Test^

The liquid medium did not turn light-yellow; instead, melanin precipitation was produced by oxidation of L-DOPA. And when sprayed sodium hypochlorite disinfectant into the medium, the liquid turned peach pink and more black precipitates were produced. These were the oxidation products of L-DOPA.

^Learn^

We inferred that because of the system lacked oxygen, MjDOD was not expressed successfully. And we also infirmed that L-DOPA was easily oxidizable. In the next cycle we would pay more attention to these issues.

^Cycle 3.2 The Effect of Oxygen-Enriched Cultivation on Pigment Production^

^Design^

 Considering the issues above, we should add an antioxidant into the medium. And more oxygen should be provided for the strain.

^Build^

 We cultivated the strain for 48 hours in synthetic glucose (SG) liquid medium, which contained L-DOPA and ascorbic acid. And we used larger Erlenmeyer flask and gas-permeable sealing film for yeast culture.

^Test^

The light-yellow betalamic acid were clearly visible (Figure 11) and this time the liquid was clear with no precipitation. We isolated the yellow yeast cells by centrifugation (Figure 12) and plotted the absorption peak of this pigment (Figure 13).

![Figure 11 The light-yellow betalamic acid expressed.](https://static.igem.wiki/teams/5924/results/figure19.webp)

![Figure 12 The yellow yeast cells.](https://static.igem.wiki/teams/5924/results/figure20.webp)

![Figure 13 The absorption peak of betalamic acid.](https://static.igem.wiki/teams/5924/project/proofofconcept/10.webp)

^Learn^

We learned the importance of understanding the chemical property of the reagents used. And the metabolic environment of the chassis organism mattered.

^Cycle 3.3 The Improvement of the Pigment^

^Design^

 Considering that the light-yellow of our pigment was too similar to the pale-yellow of the yeast medium in our design of the project, we decided to use amino donor to change and darken the color of the pigment, which was beneficial for our detection system' s precision as well.

^Build^

 We cultivated the strain under aerobic conditions for 48 hours in synthetic glucose (SG) liquid medium, which contained L-DOPA and ascorbic acid. And we added o-Dianisidine, 6-Aminoindole and 4-Aminobenzonic acid separately to obserbe color changes.

^Test^

 The liquid color indeed changed (Figure 14), but due to time limit we have not convinced whether the change was caused by spontaneous oxidation or yeast expression. We will tackle with this issue in the next days.
![Figure 13 The color change after adding oDA.](https://static.igem.wiki/teams/5924/project/engineering/pefigcolor.webp)

^Learn^

 We learned that the amino donor could improve the output of our detection system, but for the selection of the amino donor we needed further research.

^Cycle 4.1 The Integration into the Yeast Genome^

^Design^

 According to the consultant’ s suggestion, the expression of plasmids is not stable, which was unfavorable for us to collect standard data for modeling, and it was better to integrate related genes into the yeast genome. For this we designed a donor gene which could insert the *MjDOD* into the *URA3* of the yeast (Figure 15), which simultaneously endowed yeast with the ability to stably express MjDOD and served as a marker for uracil auxotrophy. For colony selection we planned to use 5-fluoroorotic acid (5-FOA) to perform counter-selection.

![Figure 15 The plasmid map of the donor gene.](https://static.igem.wiki/teams/5924/project/engineering/defig14.webp)

^Build and Test^

 Due to time limit we had the company synthesize the relevant plasmids. And subsequent experiments will be carried out in the next days.

^Learn^

 We learned that utilizing yeast homologous recombination to insert the target gene into its multi-copy or non-essential homology arms could improve expression stability. 

# Iteration 2: The Construction of Substrate-Acting Strain

^Cycle 1.1 The Preparation of the Plasmid Construction^

^Design^

The Substrate-acting Strain in the detection system was responsible for receiving the input signal of BoNT/A’ s enzymatic activity and delivering released α-factor to the Signal-transferring Strain. The related genetic modifications were relatively simpler (but in fact we encountered more issues in the molecular experiments). For the fusion protein expression based on the yeast surface display technology, we designed the plasmid pYES2-PGAL1-Pir1p-SNAP25-(TEV)-Mating factor α-CYC1(pYES2-TEVSITE). For prevention of endogenous false positives, we designed the plasmid pUC19-*STE2*-*URA3* to knock out *STE2* (Figure 16,17).

![Figure 16 The plasmid map of pYES2-TEVSITE.](https://static.igem.wiki/teams/5924/project/engineering/pefig15.webp)

![Figure 17 The plasmid map of pUC19-*STE2*-*URA3*.](https://static.igem.wiki/teams/5924/project/engineering/defig16.webp)

^Build^

The construction of pUC19-*STE2*-*URA3* was relatively smooth-the linearization of vector, the amplification of gene of interest and the plasmid assembly were successful, and we got high-quality electrophoresis bands during the process. We also succeed in transferring this plasmid into *E. coli* for storage. But the construction of pYES2 was much more trouble-ridden. We encountered issues when linearizing the pYES2 vector, amplifying the gene fragments responsible for TEVcs-α-factor and only obtained amplified *Pir1p* and *SNAP-25* (residues 146-202) successfully. Even though, we still made many attempts involving redesigning the primer and reprograming the PCR procedure.

^Test^

 We conducted colony PCR over these plasmid-containing *E. coli* and got positive results. And the result of its Sanger sequencing was ideal (Figure 18). But we still failed to tackle the issue encountered in the construction of pYES2-TEVSITE.

![Figure 18 The sequence map of pUC19-*STE2*-*URA3*.](https://static.igem.wiki/teams/5924/project/proofofconcept/3.webp)

^Learn^

 We distributed the issue to the length of the fragment-the gene responsible for TEVcs-α-factor was too short (80bp counting in homology arms), making DNA polymerization, gel ex7cision and isolation difficult. And for the linearization of pYES2, we did not find a reasonable cause and decided to use enzyme digestion-based linearization.

^Cycle 1.2 The PCR Amplification of Short Fragments and the Linearization of pYES2^

^Design^

 After repeatedly trying the fragments amplification, we designed an overlap strategy-we ordered two 52bp primers with a 24bp complementary sequence as templates for direct extension. We also purchased Thermo Scientific FastDigest Ecl136II for enzyme digestion-based linearization of pYES2.

^Build^

 We conducted the experiments as the design and got the bands of the short fragment and succeeded in the linearization of pYES2 after several attempts.

^Test^

 The bands of fragment responsible for TEVcs-α-factor was as followed (Figure 19).

![Figure 19 The bands of fragment responsible for TEVcs-α-factor.](https://static.igem.wiki/teams/5924/project/engineering/pefig17.webp)

^Learn^

 We designed an efficient method of short fragment amplification. And in the next cycle, this method would be applied again. We learned that we dealing with short fragments, our strategy should be flexible.

^Cycle 1.4 The Conversion of Three-Fragment Recombination to Two-Fragment Recombination^

^Design^

 After obtaining all the components of pYES2-TEVSITE, we conducted plasmid assembly via the three-fragment Gibson assembly method multiple times, but the results were unsatisfying-all the colony PCR results were false positives. Later we understood that in the Gibson assembly process, excessively short fragments (<100bp) are likely to be hydrolyzed, resulting in reduced efficiency. So we decided to lengthen the fragment of TEVcs-α-factor.

^Build^

 We used overlap PCR to connect the SNAP-25 fragment (192 bp) and TEVcs-α-factor fragment (80 bp) by virtue of the 17 bp homology arms originally designed on both sides of the two fragments and successfully obtained the connected fragment. The three-fragment recombination was turned to two-fragment, which increased the efficiency of Gibson assembly. And we transferred the recombinant DNA product into *E. coli*.

^Test^

 We conducted colony PCR over the plasmid-containing bacteria and got positive results.The Sanger sequencing result was ideal (Figure 20). 

![Figure 20 The sequence map of pYES2-TEVSITE.](https://static.igem.wiki/teams/5924/project/proofofconcept/6.webp) 

^Learn^

 We learned that the length of the fragments should be long enough and the number of the gene fragments should be as small as possible in Gibson assembly, which could increase its efficiency.

^Cycle 2.1 The Verification of Expression of Fusion Protein^

^Design^

 To verify the fusion protein expression of Substrate-acting Strain, we needed to separate and detect the cell wall-anchored proteins using protein electrophoresis. We planned to conduct the preliminary experiments about extraction and isolation of yeast cell wall proteins feasibility. We planned to process the wild-type Saccharomyces cerevisiae strain BY4741 using the established yeast cell wall protein extraction method (employing an ultrasonic cell disruptor combined with Laemmli-SDS buffer), followed by analysis via SDS-PAGE coupled with a high-sensitivity silver staining technique. We anticipated observing a rich profile of cell wall protein bands, including those of the Pir protein family, on the gel.

^Build^

 We cultured the wild-type Saccharomyces cerevisiae strain BY4741, which served as the experimental material for the methodological validation in this study. The wild-type Saccharomyces cerevisiae strain BY4741 was subjected to lysis and cell wall protein enrichment. 

^Test^

 SDS-PAGE analysis was performed as follows:

1.Coomassie brilliant blue staining (Figure 21): Only a few faint bands that did not match the predicted size appeared in the expected molecular weight region of the gel, indicating insufficient sensitivity of this staining method or a low total protein amount.

![Figure 21 The photo of Coomassie brilliant blue staining.](https://static.igem.wiki/teams/5924/project/engineering/pefig20.webp)

2.Silver staining (Figure 22): High-sensitivity silver staining revealed multiple concentrated bands, confirming the successful extraction of cell wall proteins. Although bands faintly matching the predicted size of the Pir protein family could be observed, severe interference from background proteins (heteroproteins) resulted in unclear target bands, making explicit identification impossible

![Figure 22 The photo of Silver staining.](https://static.igem.wiki/teams/5924/wetlab/result/enfig.webp)

^Learn^

 The test results indicated that the current verification method may be successful in terms of extraction efficiency (as evidenced by the numerous bands in silver staining), but failed to meet expectations in terms of detection specificity and clarity, thus being unable to provide reliable criteria for subsequent experiments. We conducted an in-depth analysis of this issue:

1: Protein degradation. During the extraction process, intracellular proteases may have been released and degraded the target proteins, resulting in blurred bands, weak signals, or smearing; 

2: Insufficient method specificity. The current protocol is designed for efficient extraction of total cell wall proteins, leading to co-extraction of a large number of contaminating proteins that severely interfere with the observation of specific target protein bands;

3: Limitations in the sensitivity and specificity of detection methods. Coomassie brilliant blue staining has insufficient sensitivity; while silver staining is sensitive, it stains a wide range of proteins, making it impossible to specifically identify target proteins from complex protein mixtures with clarity.

Based on the above analysis, we have developed an improved protocol for the next experimental cycle:

Addressing the degradation issue: Immediately add a variety of protease inhibitors to all lysis and extraction buffers, and maintain a low-temperature environment throughout the entire operation to maximize the preservation of protein integrity.

Addressing the specificity and detection issues:

Method optimization: Meanwhile, we will attempt to use a gentler cell lysis method (e.g., glass bead vortexing) combined with chemical reagent extraction, aiming to optimize the specificity of protein extraction while maintaining protein integrity.

Core improvement: In subsequent experiments on the Substrate-acting Strain, we will use modified proteins with a 6-Histidine Tag and add an affinity chromatography purification step after extraction. This will significantly enrich the target proteins, thereby obtaining clear and specific bands in electrophoresis.

^Cycle 2.2 The Expression of Fusion Protein with a 6-Histidine Tag^

^Design^

 In the last cycle, we found that the specificity and enrichment level of native Pir1p are insufficient for us to isolate and detect them; therefore, it was necessary to additionally design tag-containing fusion proteins and use them to facilitate purification. For this, we designed a new plasmid His-tagged pYES2 (Figure 23), which enabled the strain to express fusion protein with a 6-Histidine Tag.

![Figure 23 The plasmid map of His-tagged pYES2.](https://static.igem.wiki/teams/5924/project/engineering/pelast.webp)

^Build and Test^

 We conducted a series of molecular experiments constructing His-tagged pYES2 but unfortunately continuously got false positives results in colony PCR. We distributed this issue to the errors in plasmid assembly, but due to time limit, we have not completed the construction so far. In the next days, we will tackle with the issue.

^Learn^

 We learned that the design of fusion proteins must take subsequent separation, purification, and detection into account, and it is often necessary to add molecular tags that aid in purification.

^Cycle 3.1 The Integration into Yeast Genome^

^Design^

 According to the consultant’ s suggestion, the expression of plasmids is not stable, which was unfavorable for us to collect standard data for modeling, and it was better to integrate related genes into the yeast genome. For this we designed a donor gene which could insert the gene responsible for fusion protein into the *URA3* of the yeast (Figure 24), which simultaneously endowed yeast with the ability to stably express fusion protein and served as a marker for uracil auxotrophy. For colony selection we planned to use 5-fluoroorotic acid (5-FOA) to perform counter-selection.

![Figure 24 The plasmid map of the donor gene.](https://static.igem.wiki/teams/5924/project/engineering/pefig22.webp)

^Build and Test^

 Due to time limit we had the company synthesize the relevant plasmids. And subsequent experiments will be carried out in the next days.

^Learn^

 We learned that utilizing yeast homologous recombination to insert the target gene into its multi-copy or non-essential homology arms could improve expression stability. 

# Iteration 3 :  Optimize the ratio of Substrate-acting Strain and Signal-transferring Strain (Model)

^1.CYCLE 1^

^Design^

In the early stages of the project, we conducted an in-depth literature review to optimize the strain ratio in the yeast co-culture system. We found that an effective strategy is to use existing experimental data to fit a predictive model, allowing for rapid identification of the optimal ratio through simulations, thereby reducing the need for extensive experimental trial and error. This data-driven modeling approach is considered an efficient way to address optimization problems in complex biological systems.

^Build^

![Figure 25 The test figure](https://static.igem.wiki/teams/5924/drylab/figure-1.webp)

Since we did not have sufficient quantitative experimental data at the initial stage of the project, we adopted a simulation-first strategy. Based on biological knowledge and literature references, we generated a set of simulated data. This dataset assumed a nonlinear response surface between signal intensity and the ratio of the two strains. For this purpose, we constructed a two-dimensional Gaussian function as our fitting model. This function effectively simulates a smooth response surface with a peak (the optimal ratio point), enabling us to mathematically predict the potential signal intensity under different strain ratios.

^Test^

When we proceeded to the wet lab validation phase, we encountered a critical challenge: the experimental cycle was excessively long. The time required for cell growth, signal molecule diffusion, and detection far exceeded expectations, making it impossible to obtain a sufficient number of high-quality data points covering enough ratio conditions within the project timeline. As a result, the pre-constructed two-dimensional Gaussian model, which relied heavily on extensive data fitting, could not be effectively validated or applied in practice due to data scarcity. The predictive capability of the model was limited.

 ^Learn^

From this iteration, we learned that modeling strategies must be closely aligned with the actual conditions and constraints of the experimental team. In situations where obtaining experimental data is costly and time-consuming, over-reliance on a "data-first, model-later" fitting approach carries risks. We realized that when selecting modeling methods for future research, priority should be given to mechanistic models—those built on our understanding of the underlying biological mechanisms (such as diffusion, enzymatic reactions, and receptor binding). Such models can be constructed even with limited initial data and can be validated and refined with subsequent key experimental data, thereby better adapting to the uncertainties inherent in life sciences research and ensuring that theoretical studies and experimental practices advance in tandem.

^2.CYCLE 2^

^Design^

In the initial design stage, our goal was to describe the diffusion and binding process of α-factor between producer and receptor yeast cells. For simplicity, we assumed that the absorption rate on the receptor surface was proportional to the local α-factor concentration and defined the boundary condition as\[J=k[α][Ste2p]\]This formulation made the model simple and mathematically tractable, though we did not yet account for receptor saturation effects.

^Build^

We implemented this boundary condition in our finite element model and simulated the spatiotemporal evolution of α-factor concentration using a time-stepping numerical scheme. Multiple simulations were conducted with varying diffusion coefficients and rate constants to test the model’s robustness.

^Test^

However, the simulation results consistently indicated that a 1:1 ratio between producer and receptor cells was required to reach equilibrium.
![](https://static.igem.wiki/teams/5924/drylab/iteration.webp)
Discussions with the wet-lab team helped us realize that our linear boundary condition was flawed: it implicitly assumed an unlimited number of Ste2p receptors and neglected essential biological features such as finite binding sites and saturation effects.

^Learn^

Through this process, we learned the importance of correctly translating biological mechanisms into mathematical representations. The initial boundary condition seemed biologically reasonable, but it failed to capture the real balance between production and uptake. By replacing it with a constant uptake rate, the model began to reflect the experimentally observed behavior — that an excess of signal yeast leads to more efficient communication. 

This correction was made possible through close collaboration between the modeling and wet lab teams: experimental feedback helped identify the unrealistic 1:1 ratio, while modeling refinement provided a theoretical explanation and new guidance for future experiments.

In short, this learning process not only improved our model but also deepened our understanding of how modeling and experimentation can complement and correct each other.

^3.CYCLE 3^

^Design^

we constructed a mathematical model to explore how the Substrate-acting Strain-to-Signal-transferring Strain ratio influences α-factor distribution and receptor activation. By quantitatively describing the balance between α-factor production, diffusion, and uptake, our model aims to identify the optimal ratio that maximizes signaling efficiency.

^Build^

We construct a one-dimensional diffusion partial differential equation with boundary conditions (secretion and uptake fluxes) and solve it numerically using the finite element method.A finite element solver is written in Python to simulate the cumulative uptake of α-factor under different strain ratios.

^Test^

The fraction of Substrate-acting Strain, $ p $, is scanned from 0.01 to 0.99 to calculate the cumulative uptake $J_2 $.The maximum uptake occurs when Signal-transferring Strains dominate the population (i.e., a small $ p$).

^Learn^

Signal-transferring Strains should significantly outnumber Substrate-acting Strains to optimize signal capture efficiency and avoid saturation.Provides a theoretical basis for determining co-culture ratios in experiments and reveals that a higher fraction of signal strains performs better at low BoNT concentrations, while the opposite is true at high concentrations.The uptake model could be further optimized (e.g., by introducing concentration dependence), or the effects of spatial heterogeneity on diffusion could be considered.

# Iteration 4:  Simulate Signal-Transferring Strain BoNT/A-Signal Response and Analysis LOD,LOQ and Parameter Sensitivity 


^1. CYCLE 1 Start from scratch to first build graph-based DDE model. ^

^Design^

Biochemical processes can often be expressed using ordinary differential equations, so our primary model start with ODE equations. Inspired by Graph theory, we analyzed interconnected structures and introduced graph computation into the model.

^Build^

We first attempted to use the Python third-party library Scipy to calculate ODE equations. Since we were unfamiliar with ODE calculations and had not yet mastered the solve_ivp method for solving multiple equations globally, we began by experimenting with graph modeling. We then introduced a “self-updating” algorithm, which theoretically updates its own state every 0.1 seconds based on the states of upstream and downstream nodes. This was an algorithm we had high hopes for.

^Test^

However, the maintenance and operation of the code was extremely complex. After in-depth analysis of the algorithm and architecture, more problems surfaced: in actual implementation, point-by-point updates were necessary, but the asynchrony of updates at each point was not a little and generated a lot of computational errors. As a result, this “self-updating” algorithm that depends terribly on highly frequent update was not realistic and was given up.

^Learn^

The “self-updating” algorithm was once a dark cloud, wasting a lot of research time, but it also reminded us of the importance of designing algorithms scientifically. It is important to grasp the essence of the problem—especially to calculate differential equations, which gave birth to the new “flux” algorithm. With the design of the new algorithm, we greatly enhancing the robustness of the code.

^2. CYCLE 2 Start from graph-based DDE model to obtain the Hill-like curve. ^

^Design^

We successfully established the analysis of the entire project using Dijkstra's algorithm and the Euler global iterative integration based on the principle of flux. We began literature research in attempt to obtain the accurate parameters of each process, but ended up no ideal results.

^Build^

We met difficulty in parameter research, because biochemical parameters may only be an unimportant statement in a reported literature, which made us feel like looking for a needle in the ocean. In addition, we also obtained the earliest program simulation diagram, which was a straight line. This obvious error frustrated us. We did not know which process went wrong, so we began to try a more scientific modeling method.

We then began to seek real scientific research methods, fully utilizing academic search engines and databases to quickly find data.

^Test^

We learned to skillfully use `google scholar`, `Uniprot`, literature citation, and knowledge base building techniques to expand our literature reading and manage literature. We gathered related papers and used local files and knowledge base management techniques, which worked like a "search engine" to quickly find key parameter descriptions, which greatly improving the efficiency of research. We found the main reason why the curve was a straight line-the linear equation was used improperly to model the binding process of α-factor and ste2 receptor. We quickly introduced the binding constant Kd and the 50% effect constant $EC_{50}$ on the downstream, and finally achieved a more reasonable effect.

^Learn^

We surveyed more parameters much faster and learned the importance of academic research tools, and more importantly, we felt the importance of technology to scientific research, and our progress was greatly accelerated.

^3. CYCLE 3 From graph-based calculation to partly back to using ddeint kit^

^Design^

In the second round, we designed a complete executable graph computing software, which mainly uses Dijkstra's algorithm to calculate the initial arrival time of node signals. We borrowed the concept of “flux” in physics and used point-by-point traversal to perform explicit Euler integration of the signal input and output rates of each node every $\Delta_t$ time. For nodes and substances whose upstream and downstream actions do not meet the definition of differential equations, we used elementary functions to link them across time domains.

^Build^

Our entire project is divided into`graph.py`, which stores the graph structure, and `Traversal41.py`, which traverses edges and nodes at different time points every $\Delta_t$ and performs calculations. The calculation process of `Traversal41.py` is concentrated on the update of node and material status every $\Delta_t$.

^Test^

We ran the program on a laptop and tried to use it to simulate an 8-hour process. However, we were disappointed to find that the running time often took tens of minutes and sometimes even hours. This greatly affected our debugging, running, and iterative algorithm progress. In addition, the graph-based algorithm needs to handle two situations: “flux input and output” and “signal cross-time polynomial mapping”. The complex code logic makes code maintenance very difficult.

^Learn^

We delved into computational methods and techniques for solving differential equations using Python. We came to deeply understand the huge gap in execution speed between Python precompiled code and interpreted code. We decided to first use `ddeint` to restructure some high-computation scenes involving scanning. This process is still ongoing...

^4.CYCLE 4 From 0 noise to LOD estimation under Gaussian noise simulated by Monte-Carlo methods^

^Design^

After obtaining the 8-hour BoNT/A-signal dose-response curve, we expected to predict the LOD and LOQ of the sensor through modeling. Considering that the leakage expression of the GAL1pr promoter is the main source of background noise, we planned to calculate the background noise separately and estimate the LOD and LOQ accordingly.

^Build^

We established a method based on global Hill equation fitting, using the detection threshold and quantification threshold of signal intensity to calculate LOD and LOQ.

^Test^

We quickly found problems. The global Hill equation fits well globally, but poorly near LOD and LOQ. It is impossible to infer LOD and LOQ from the detection threshold and quantification threshold of the signal. In addition, this model ignored random noise and violated the scientific definition of noise.

^Learn^

We learned more statistical knowledge and understood the Monte-Carlo simulation method and the scientific definition of noise. We assumed that the random fluctuations of the process followed a normal distribution, and set the coefficient of variation(CV) for important processes, so as to calculate the mean and standard deviation of the baseline signal. Local interpolation is sufficient to calculate LOD and LOQ.

^5. CYCLE 5 From being entangled in parameter selection to analyzing parameter sensitivity. ^

^Design^

We researched for parameters for transcription, translation, and reaction processes, and it was often difficult to make a final choice among the vastly different values of the same parameter from different sources. We decided to first analyze the impact of parameters on the results to understand which parameters need to be focused on. We then began to analyze each single parameter.

^Build^

We introduced the parameter sensitivity coefficient S to measure the relative proportion of changes in results caused by changes in parameters.

^Test^

Through single-parameter sensitivity analysis, we obtained important parameters such as $Km_{BoNT/A}$ and decided to conduct in-depth research in the next step. However, we also learned that our simple algorithm could not capture the coupling effect of signals and metabolic pathways, so we decided to conduct global, multi-parameter sensitivity analysis. We introduced the Sobol index for variance decomposition to determine the effects of individual and combined actions.

^Learn^

We realized the importance of parameter accuracy. We not only focused on the accuracy of the parameters themselves, but also on the impact of parameter uncertainty on the results. We learned the important awareness of tracing the cause from the result and the cause from the result. In-depth statistical analysis has preliminarily revealed the deeper structure and relationships of the system.
