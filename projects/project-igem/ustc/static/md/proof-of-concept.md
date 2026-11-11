^To ensure the proper construction of the detection system and the feasiblity of the whole project in enough time, we conducted a series of experimental verification and medel-based validation.^

# 1. Verification of Molecular Experiments

+ ^1.1 Plasmid Construction^

    In our project, we constructed several plasmids, including four plasmids for gene knockout (pUC19-*GAL4-URA3*, pUC19-*GAL80-HIS3*, pUC19-*STE2-URA3*, pUC19-*FAR1-URA3*), as well as plasmids for knocking three protein genes (*sTF*, *Pir1p-SNAP25-(TEV)-Mating factor alpha*, *MjDOD*) into the genome (pUC19-*sTF*, pYES2-PGAL1-*Pir1p-SNAP25-(TEV)-Mating factor alpha*-CYC1, pYES2-PGAL1-*MjDOD*-CYC1). Each step of the construction process was verified by PCR. Additionally, we performed Sanger sequencing on the final constructed plasmids to ensure their sequences were accurate. The related sequencing map was as followed.



    ![Figure 1 Sequencing results of the pUC19-GAL4-URA3 plasmid.](https://static.igem.wiki/teams/5924/project/proofofconcept/1.webp) 
    ![Figure 2 Sequencing results of the pUC19-GAL80-HIS3 plasmid.](https://static.igem.wiki/teams/5924/project/proofofconcept/2.webp)
    ![Figure 3 Sequencing results of the pUC19-STE2-URA3 plasmid.](https://static.igem.wiki/teams/5924/project/proofofconcept/3.webp)
    ![Figure 4 Sequencing results of the pUC19-FAR1-URA3 plasmid.](https://static.igem.wiki/teams/5924/project/proofofconcept/4.webp)
    ![Figure 5 Sequencing results of the pUC19-sTF plasmid.](https://static.igem.wiki/teams/5924/project/proofofconcept/5.webp)
    ![Figure 6 Sequencing results of the pYES2-PGAL1-Pir1p-SNAP25-(TEV)-Mating factor alpha-CYC1 plasmid. ](https://static.igem.wiki/teams/5924/project/proofofconcept/6.webp)
    ![Figure 7 Sequencing results of the pYES2-PGAL1-MjDOD-CYC1 plasmid.](https://static.igem.wiki/teams/5924/project/proofofconcept/7.webp)

+ ^1.2 Acquisition of Target Yeast Strains^

    In our project, the detection system consisted of the Substrate-acting strain and the Signal-transferring strain. To obtain these two strains, it was necessary to perform several rounds of knockout and integration in the original BY4741 strain using the plasmids we constructed.

    For the knockout phase, we transformed the functional sequence fragment (donor fragment) from the pUC19-*STE2-URA3* plasmid into the Substrate-acting strain to knock out the *STE2* gene in the yeast genome via homologous recombination.

    Similarly, for the Signal-transferring strain, we used this method, transforming donor fragments extracted from the pUC19-*GAL4*-*URA3*, pUC19-*GAL80-HIS3*, and pUC19-*FAR1*-*URA3* plasmids into yeast.Subsequently, we utilized their auxotrophic characteristics, employing selection media to screen for our target strains, and verified the knockout efficiency via colony PCR.

    Following this, we planned to introduce the expression plasmids (pYES2-PGAL1-*Pir1p-SNAP25-(TEV)-Mating factor alpha*-CYC1, pYES2-PGAL1-*MjDOD*-CYC1) and the genetic modification plasmid (pUC19-*sTF*).For the pUC19-*sTF* plasmid, as originally planned for genomic integration, the donor fragment was obtained similarly, transformed into the Signal-transferring strain, and successful integration was verified by colony PCR. For the expression plasmids, our original plan was to integrate the expression cassette into the genome to achieve stable expression. 

    The photos of related yeast colony PCR are as followed (Figure 8,9,10,11,12).

    ![Figure 8 The results of yeast colony PCR-sTF.](https://static.igem.wiki/teams/5924/project/proofofconcept/stf-only.webp)

    ![Figure 9 The results of yeast colony PCR-GAL4.](https://static.igem.wiki/teams/5924/project/proofofconcept/gal4-only.webp)

    ![Figure 10 The results of yeast colony PCR-GAL80.](https://static.igem.wiki/teams/5924/project/proofofconcept/gal-80.webp)

    ![Figure 11 The results of yeast colony PCR-MjDOD.](https://static.igem.wiki/teams/5924/project/proofofconcept/mjdod.webp)

    ![Figure 12 The results of yeast colony PCR-STE2(Substrate-acting Strain).](https://static.igem.wiki/teams/5924/project/proofofconcept/ste-2.webp)

    However, due to time constraints, this was not successfully accomplished. We only transformed the plasmids into the target yeast strains (pYES2-PGAL1-*Pir1p-SNAP25-(TEV)-Mating factor alpha*-CYC1 into the Substrate-acting strain, and pYES2-PGAL1-*MjDOD*-CYC1 into the Signal-transferring strain). Regarding the expression of *MjDOD*, as described previously, good results were obtained. For the expression of *Pir1p-SNAP25-(TEV)-Mating factor alpha*, as it cannot be directly detected, we plan to co-culture the already constructed Substrate-acting strain and Signal-transferring strain and observe the results, provided time permits.


# 2. Verification of the Expression of Engineered Yeast

+ ^Pigment Expression^

    In our project, we needed to enable the Signal-transferring Strain to produce betalamic acid. To validate the feasibility of this approach, we transformed the pYES2-PGAL1-*MjDOD*-CYC1 plasmid into yeast cells. The yeast was then cultured in SG medium supplemented with 1 M L-DOPA and 10 M ascorbic acid for 48 hours. Pigments were clearly visible in the culture. After centrifugation, both the supernatant and the pellet appeared light-yellow. Using uninoculated medium as a blank, we measured the absorbance of the supernatant at various wavelengths.

    ![Figure 8 The expression of betalamic acid. From left to right are blank culture medium, yeast without transformed plasmids, and two yeast strains transformed with pYES2-PGAL1-MjDOD-CYC1 plasmids.](https://static.igem.wiki/teams/5924/project/proofofconcept/8.webp)
    ![Figure 9 Color of both the pellet and supernatant.](https://static.igem.wiki/teams/5924/project/proofofconcept/9.webp)
    ![Figure 10 The absorbance curve of the supernatant.](https://static.igem.wiki/teams/5924/project/proofofconcept/10.webp)



# 3. Model-Based Validation

+ ^3.1 the Cleavage Efficiency of BoNT/A Light Chain^

    ![Figure 11 Activation energy calculation results, representing a relative measure of cleavage efficiency.](https://static.igem.wiki/teams/5924/drylab/cleavage.webp)
    ![Figure 12 Docking results of BoNT/A with SNAP-25 variants.](https://static.igem.wiki/teams/5924/drylab/snap-25.webp)
    ![Figure 13 Docking results of cleavage products with Ste2 receptor.](https://static.igem.wiki/teams/5924/drylab/ste2.webp)
    In our project design, due to the specificity of the botulinum toxin cleavage site, the α-factor released upon botulinum toxin cleavage of the SNAP25 protein retains a segment of amino acid residues at its C-terminus. To assess whether this C-terminally truncated α-factor can properly bind to its receptor, and to explore potential improvements to the experimental plan, we performed modeling to analyze both the cleavage efficiency and binding efficiency of α-factor with varying lengths of C-terminal extensions (corresponding to different SNAP25 mutants).

    To study the differences in cleavage efficiency of the BoNT/A light chain on SNAP-25 mutants (specifically, deletions in the 199–202 region) and to combine this analysis with the binding affinity of the resulting cleavage products to the Ste2 receptor, we performed molecular docking simulations. The ultimate goal was to screen for the optimal mutant sequence. After docking using ClusPro 2.0, binding capability was initially evaluated based only on the lowest-energy conformation or a simple weighted average score.
    Ultimately, it was found that the Δ199–202 mutant performed best in both cleavage efficiency and downstream binding.This not only proves the feasibility of our project, but also points out the direction for subsequent improvements.


+ ^3.2 Simulation of fusion protein shedding^
    ![Figure 14](https://static.igem.wiki/teams/5924/drylab/resuscitation-stage.webp)
    Since our fusion protein was anchored extracellularly by Pir1p part, we sought to determine whether its anchoring efficiency might impact our expected outcomes. If the anchoring efficiency is low, the potential detachment of the fusion protein could lead to uncleaved fusion proteins binding to the receptor, resulting in false positive signals.

    We employed a combined approach of ODE equations and molecular dynamics simulations to exclude potential false-positive interference caused by shed fusion proteins. The results indicate that the probability of fusion protein shedding is very low, and any shed proteins are incapable of binding to the membrane-localized Ste2 receptor on the signal-transferring strain.The possibility of false positives resulting from this approach has been ruled out.


+ ^3.3 Simulation of the entire working process of the system^
    ![Figure 15 The relationship between botulinum toxin concentration and absorbance.](https://static.igem.wiki/teams/5924/drylab/bonta-signal.webp)
    Due to time constraints preventing the collection of sufficient experimental data for comprehensive quantitative analysis, we have attempted to model the entire process based on various credible and reliable data sources. These data originate from the actual experimental results obtained by our wet lab teammates as well as data from literature on similar experiments. 

    We simulated the entire process of the system's operation through modeling and ultimately obtained the relationship between botulinum toxin concentration and absorbance , providing a reference for the feasibility of our system.

    For any data presented in this section, if you wish to trace their origins or understand the modeling principles and procedures, please refer to our Model page.