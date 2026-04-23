# PCR Reaction Using PrimeSTAR MAX

^Objective^:

Amplify the target gene sequence utilizing a high-fidelity DNA polymerase. This section includes operational procedures for TaKaRa PrimeSTAR MAX.

^1. Utilization of TaKaRa PrimeSTAR MAX (R045) Kit^

① Retrieve the reagent from -20°C storage. This kit contains a single component: PrimeSTAR MAX Premix (2X).

② Sequentially add reagents to PCR tubes and prepare the subsequent reaction mixture on ice:

![Fig 1：PrimeSTAR MAX Premix (2X) kit](https://static.igem.wiki/teams/5924/wetlab/wiki/tab1.webp)

For this kit, DNA template quantities up to 200ng are acceptable; however, excessive template addition should be avoided.

Multiple freeze-thaw cycles of the premix will compromise experimental performance. Each aliquot of PrimeSTAR MAX Premix contains 125μL, which can be pre-divided according to experimental requirements.  
This kit has been validated for scaling down to 30μL reaction volumes.

③ Execute the following thermal cycling protocol:

In addition to the manufacturer's instructions, incorporate pre-denaturation, final extension, and storage phases. Thermal profile parameters may reference Phanta protocols.  
For rapid amplification reactions employing PrimeSTAR MAX DNA Polymerase, 3-step PCR conditions are recommended to optimize extension efficiency.

_PCR protocol for DNA concentrations ≤200 ng/50 μl reaction:_
![Tab 1-1](https://static.igem.wiki/teams/5924/wetlab/wiki/fig1.webp)

_PCR protocol for DNA concentrations >200 ng/50 μl reaction:_
![Tab 1-2](https://static.igem.wiki/teams/5924/wetlab/wiki/fig2.webp)

For high-efficiency PCR using reverse transcription products as templates (extension rate of 5-10 sec/kb), cDNA input in a 50 μl reaction should not exceed the equivalent of 125 ng total RNA.  
With extended extension times (extension rate adjusted to 1 min/kb), template input in a 50 μl reaction can be increased to approximately 750 ng total RNA equivalents.

Denaturation parameters: For 98°C, recommended duration is 5-10 sec; for 94°C, recommended duration is 10-15 sec.  
Annealing temperature: Initial setting at 55°C  
Annealing duration: For calculated Tm values ≥55°C, set to 5 sec;  
For calculated Tm values <55°C, set to 15 sec.

※ _Tm value calculation:_  
_Tm (°C) = 2(A+T)+4(C+G)-5_

This equation is applicable to oligonucleotide primers ≤25 nucleotides. For primers >25 nucleotides, annealing time is fixed at 5 sec.

^Critical Note:^ Given that this enzyme exhibits superior annealing efficiency, annealing durations should typically be maintained at either 5 sec or 15 sec. Extended annealing periods must be avoided, as they may result in smeared bands during electrophoretic analysis of PCR products.

# Using the FastPure Gel DNA Extraction Mini Kit for PCR product recovery

^1.Objective:^

To recover DNA fragments from samples (PCR, enzyme digestion products).

^2.Content:^

Instructions for using the Vazyme FastPure Gel DNA Extraction Mini Kit (Vazyme Biotech Co.,Ltd, China) , use of water bath, use of desktop centrifuge and freeze centrifuge, use of metal bath, and use of Nanodrop One.The DNA samples prepared by PCR or enzyme digestion usually contain various components such as salt ions in the reaction buffer and proteins, which may affect the next step of the experiment. Therefore, it is necessary to purify DNA from the reaction system. According to the type of reaction system and the requirements for the next experimental step, it can be further divided into two types: rubber cutting recovery and liquid recovery.

![Fig 2:fastpure gel dna extraction mini kit](https://static.igem.wiki/teams/5924/wetlab/wiki/fig4fastpure-gel-dna-extraction-mini-kit.webp)

^3.Gel recycling:^

In the following situations, gel recovery must be used to ensure correct sample purity: amplifying genes using plasmids as templates without DpnI enzyme digestion; After running the identification gel, the PCR product has non-specific amplification; Enzymatic cleavage products.Simply put, when the substrate has an impact on subsequent experiments, the recovered product must be gel recovered.

3.1*The gel recovery procedure is as follows:*

① Run separation gel on the sample. Quickly cut the DNA gel containing the target band under the UV light, absorb the water, cut it into pieces, weigh it, and place it in the centrifuge tube. Buffer GDP is added according to the proportion of adding 100 μ L per 100mg of gel.

② Place the centrifuge tube in a 55 ℃ water bath pan, and keep the tube bath in it for 7-10 min until the gel completely melts. Invert and mix 2-3 times midway to make the sol complete.

③Assemble the adsorption column and collection tube. Let the sol solution cool slightly, centrifuge for a moment with a handheld centrifuge, transfer no more than 700 μ L of the solution to the adsorption column, centrifuge at 12000rpm (13800rcf) for 1 minute, discard the filtrate, and place the adsorption column in the recovery header. If the total volume after melting is greater than 700 μ L, repeat this step.

④ Add 300 μ L of Buffer GDP to the adsorption column, let it stand for 1 minute, centrifuge at 12000rpm (13800rcf) for 1 minute, discard the filtrate, and place the adsorption column back in collection tube.

⑤ Slowly add 700 μ L Buffer GW along the wall of the adsorption column, centrifuge at 12000rpm (13800rcf) for 1 minute, discard the filtrate, and place the adsorption column back in the collection tube.

⑥ Repeat step ⑤ .

⑦ Place the adsorption column back in the collection tube and centrifuge at 12000rpm (13800rcf) for 2 minutes. The purpose of this step is to completely remove residual Buffer GW.

⑧ Discard the collection tube and place the adsorption column in a new 1.5mL centrifuge tube. Add 20-30 μ L Elution Buffer to the center of the adsorption column, let it stand at room temperature for 2 minutes, and centrifuge at 12000rpm (13800rcf) for 1 minute. To achieve a higher yield, add the eluted solution back into the adsorption column, let it sit for 2 minutes, and centrifuge for elution again.

^4.Liquid recovery^

In other cases, liquid recovery can be used.

_The liquid recovery procedure is as follows:_
① If the sample volume is less than 100 μ L, dilute the sample with pure water to 100 μ L. Add 5 times the volume of Buffer GDP to the sample and mix well. If the size of the recovered sample is less than 100bp, after adding Buffer GDP, add 1.5 times the volume (sample+GDP) of anhydrous ethanol and mix well.

② Assemble the adsorption column and collection tube. Instantly centrifuge the solution with a handheld centrifuge for a moment, transfer no more than 700 μ L of the solution to the adsorption column, centrifuge at 12000rpm (13800rcf) for 1 minute, discard the filtrate, and place the adsorption column back in the collection tube. If the total volume is greater than 700 μ L, repeat this step.

③ Follow steps ⑤ to ⑧ of gel recycling.

^5.Using Nanodrop One to measure sample nucleic acid concentration.^

① Before using Nanodrop One, turn on the instrument and wait for its self-test to complete.

② After selecting the appropriate mode, wait for it to self check. Lift up the detection arm, point 1 μ L-2 μ L blank solution, cover the through-hole, lower the detection arm, and perform blank detection.

③ After completing the blank detection, lift the detection arm and clean the solution on the light hole and detection arm with a lens wiping paper. Then, add an equal volume of sample and detect the concentration. After testing, continue to use lens cleaning paper to dry. Repeat this step until all samples have been tested and the concentration has been marked.

④ Place 2 μL of pure water on the through-hole, lower and lift the detection arm, clean once, absorb the water, and lower the detection arm. If there are no follow-up experiments on Nanodrop on that day, shut down.

# Single segment homologous recombination reaction using ClonExpress II One Step Cloning Kit

^1.Objective:^

To construct a recombinant plasmid through single fragment recombination.

^2.Content:^

Design of recombinant reaction primers and use of the Vazyme ClonExpress II One Step Cloning Kit kit(Vazyme Biotech Co.,Ltd, China).We currently use homologous recombination to construct plasmids. Compared with enzyme-linked and enzyme digestion, it has the advantages of being unrestricted by site, fast speed, and high efficiency. We use ClonExpress II One Step Cloning Kit for multi fragment homologous recombination.

![Fig 3:clonexpress II one step cloning kit](https://static.igem.wiki/teams/5924/wetlab/wiki/fig5clonexpress-ii-one-step-cloning-kit.webp)

^3.Summary of Experimental Principles and Procedures^

A. Linearization of vectors: Linearized vectors are obtained by cutting or reverse PCR.  
B. Insertion fragment acquisition: Take the 15-20 bp sequence at the end of the linearized vector as the homologous sequence (marked in red and blue), and add it to the 5 'end of the gene specific forward/reverse amplification primer sequence, respectively, to amplify the insertion fragment with homologous sequence using this primer pair.  
C.Recombination reaction: Mix the linearized vector and insertion fragment in proportion. Under ExnaseII catalysis, react at 37 ℃ for 30 minutes to complete the recombination reaction. Achieve in vitro cyclization of two linearized DNA  
D.Transforming competent cells: Directly transforming recombinant products. Hundreds of monoclonal antibodies will be formed on the plate for later positive screening.

![Fig 4:schematic diagram of constructing recombinant plasmids ](https://static.igem.wiki/teams/5924/wetlab/wiki/pt-figure-4.webp)
_A and B represent the fragment preparation process, requiring approximately 2 hours;
C corresponds to the recombination step, taking about 30 minutes;D denotes the transformation procedure, which requires approximately 1 hour.​_

^4.Linearized carrier preparation^

4.1 Select appropriate cloning sites and linearize the vector. Try to choose sites with no duplicated sequences and GC content between 40% -60% within the 20 bp upstream and downstream regions of the vector cloning site for cloning.

4.2 Linearization method of the carrier: restriction endonuclease digestion or reverse PCR amplification can be selected.When preparing linearized carriers by enzymatic digestion, it is recommended to use a dual enzyme digestion method to fully linearize the carrier and reduce the conversion background (false positive clones); If single enzyme linearization is used, please extend the enzyme digestion time appropriately to reduce residual circular plasmids and lower the transformation background.

▲ There is no DNA ligase in the recombination reaction system, which will not cause self ligation of the vector. Therefore, even linearized carriers prepared by single enzyme  
digestion do not require terminal dephosphorylation treatment. The false positive clones (without inserted fragments) that appear after the transformation of recombinant products are formed by the transformation of non linearized circular vectors.When preparing linearized vectors by reverse PCR amplification, it is recommended to use high fidelity polymerase Phanta Max Super Fidelity DNA Poly polymerase (Vazyme Biotech Co.,Ltd, China). for vector amplification to reduce the introduction of amplification mutations. In a 50 μl PCR system, it is recommended to use 0.1-1ng circular plasmid templates or pre linearized plasmids as templates to reduce the impact of residual circular plasmid templates on cloning positivity rates.

^5.Inserting fragments to obtain^

5.1 General principle of primer design: Introduce homologous sequences from both ends of the linearized vector at the 5 'end of the primer for forward and reverse amplification of the inserted fragment, so that the amplified inserted fragment 5' and 3 'have homologous sequences (15-20 bp, excluding the cleavage site) corresponding to the two ends of the linearized cloning vector, respectively.

5.2 The design method of forward amplification primers for inserting fragments is:
5'- upstream vector terminal homologous sequence+enzyme cleavage site (can be retained or deleted)+gene specific forward amplification primer sequence -3'

5.3 The design method of reverse amplification primers for inserting fragments is:

5'- downstream vector terminal homologous sequence+enzyme cleavage site (can be retained or deleted)+gene specific reverse amplification primer sequence -3'

▲ gene specific forward/reverse amplification primer sequence, i.e. conventional insertion fragment forward/reverse amplification primer sequence, Tm value of 60-65 ℃ is optimal;

▲ Upstream/downstream vector terminal homologous sequence, which is linearized vector terminal sequence (for homologous recombination), with a GC content of 40% - 60% is optimal.

▲ If the final primer length exceeds 40bp, it is recommended to use PAGE purification  
during primer synthesis to improve the cloning success rate. When calculating the annealing temperature of amplification primers, only the Tm value of the gene specific amplification sequence needs to be calculated, and the introduced homologous sequences and enzyme cleavage sites should not be included in the calculation.

^6.Insertion fragment PCR amplification^

The inserted fragment can be amplified by any PCR enzyme (Taq enzyme or high fidelity enzyme) without considering the presence or absence of an A tail at the end of the product (which will be removed during the recombination process and will not appear in the final vector). But in order to reduce the introduction of amplification mutations, it is recommended to use high fidelity polymerase Phanta Max Super Fidelity DNA Polymerase for amplification.

^7.Calculation of carrier and insertion fragment usage:^

The optimal amount of cloning vector used in the ClonExpress II recombinant reaction system is 0.03 pmol, and the optimal amount of insertion fragment used is 0.06 pmol (molar ratio of vector to insertion fragment is 1:2). The DNA mass corresponding to these molar numbers can be roughly calculated using the following formula:The optimal amount of cloning vector = [0.02 X cloning vector base pairs] ng (0.03 pmol) The optimal amount of insertion fragment=[0.04 X insertion fragment base pairs] ng (0.06 pmol)For example, when cloning a 2kb insertion fragment into a 5kb cloning vector, the optimal amount of cloning vector used should be: 0.02x5000=100 ng; The optimal dosage for inserting fragments should be 0.04 x2000=80ng.

^a.^ When the length of the inserted fragment is greater than that of the cloning vector, the calculation method for the optimal cloning vector and insertion fragment usage should be swapped, that is, the inserted fragment should be used as the cloning vector, and the cloning vector should be used as the inserted fragment for calculation.

^b.^ The usage of linearized cloning vectors should be between 50-200 ng; The usage amount of inserted fragment amplification products should be between 10-200 ng. When using the above formula to calculate the optimal usage of DNA exceeds this range, simply select the lowest/highest usage.

^c.^ When using linearized cloning vectors and insertion fragment amplification products without DNA purification, the total volume added should not exceed 1/5 of the reaction system volume, that is 4μl.

^8.Recombination reaction^

_8.1_.Calculate the amount of DNA required for the recombination reaction according to the formula.To ensure the accuracy of sample addition, the linearized carrier and insertion fragment can be appropriately diluted before preparing the recombinant reaction system, and the amount of each component added should not be less than 1μl.

_8.2.Prepare the following reaction system on ice:_

_Table 2:reaction system_

| Components         | Recombination reaction | Negative control 1 | Negative control 2 | Positive control |
| ------------------ | ---------------------- | ------------------ | ------------------ | ---------------- |
| linearized carrier | XμL                    | XμL                | 0μL                | 1μL              |
| insertion fragment | YμL                    | 0μL                | YμL                | 1μL              |
| 5×CE ll Buffer     | 4μL                    | 0μL                | 0μL                | 4μL              |
| Exnase ll          | 2μL                    | 0μL                | 0μL                | 2μL              |
| dd H₂O             | To 20μL                | To 20μL            | To 20μL            | To 20μL          |

_8.2_.1.X/Y calculates the amount of carrier and insertion fragment according to the formula.

_8.2_.2.Negative control -1 can be used to confirm the presence of residual circular plasmids in the linearized cloning vector, and is recommended.

_8.2_.3.Negative control -2 is recommended when the inserted fragment amplification

template is a circular plasmid with the same resistance as the cloning vector.

_8.2_.4.Positive control reactions can be used to exclude the influence of other experimental materials and operational factors.

_8.3_.Use a pipette to gently suck and mix (do not shake to mix), and briefly centrifuge to collect the reaction solution to the bottom of the tube.

_8.4_.React at 37℃ for 30 minutes; Reduce to 4℃ or immediately cool on ice.

# Using Seamless Cloning Kit for Multi Fragment Homologous Recombination Reaction

^1.Objective^:
To construct plasmids through homologous recombination of multiple fragments.

^2.Content^:

Constructing plasmids through homologous recombination of multiple fragments using Seamless Cloning Kit (Beyotime Biotechnology, China).The previous CE II can only insert one fragment into a plasmid. By using homologous recombination of multiple fragments, multiple fragments can be continuously inserted into a plasmid. After comparison, we found that the positive rate of Beyotime Biotechnology 's reagent kit is relatively high, so Beyotime Biotechnology 's reagent kit is used for multi fragment homologous recombination.The Seamless Cloning Kit can perform single fragment and multi fragment recombination, but the efficiency of single fragment is not as good as CE II. Therefore, we only use this kit for multi fragment homologous recombination.Please refer to Figure 9 for the schematic diagram of the working principle of the Beyotime seamless cloning kit.

![Fig 5:seamless cloning kit](https://static.igem.wiki/teams/5924/wetlab/wiki/fig8seamless-cloning-kit.webp)

![Fig 6:schematic diagram fragment recombination principle](https://static.igem.wiki/teams/5924/wetlab/wiki/pt-figure7.webp)

^3.Preparation of Linearized Carrier^

The linearization of the carrier can select appropriate sites on the target carrier for dual enzyme digestion or single enzyme digestion, and carry out agarose gel electrophoresis and gel cutting purification on the digested carrier (such as Beyotime 's D0056, DNA gel reclcling kit). Alternatively, PCR can be performed by designing primers with opposite directions on the left and right sides of the plasmid insertion site to obtain linearized vectors. The linearized vector obtained by PCR amplification also needs agarose gel electrophoresis and gel cutting purification. Attention should also be paid to the following matters:

^a^. In order to reduce the background of carrier self-connection and improve the positivity rate, it is recommended to use a double enzyme digestion method to linearize the vector. Single enzyme cleavage of the carrier can easily lead to incomplete cleavage and self-connection, resulting in false positives.

^b.^ After enzyme digestion, whether it is the 5' end protrusion, 3' end protrusion, or flat end protrusion, they can all be used in this kit. However, due to the 3 'end protrusion generated during the recombination process, the false positive rate of 3 'protruding or flat end will be lower.

^c^. In the case of obtaining a linearized vector through cutting, the overlapping sequence on the linearized vector can only be calculated using the 3 'end sequence after enzyme cutting. Especially for cases where the 5' end protrudes after enzyme digestion, the overlapping sequence cannot be calculated based on the 5' end protrusion, as DNA 5' exonuclease activity is present during recombination reactions, which can digest the 5' end sequence.

^d^. Enzyme cutting for a longer period of time, such as enzyme cutting for more than 3 hours or enzyme cutting overnight, can effectively reduce the background caused by uncut or self connected carriers.

^e^. When obtaining linearized vectors through PCR method, it is recommended to use DpnI (such as D6257 from Beyotime) for digestion after PCR to eliminate the interference of template plasmids on the subsequent acquisition of recombinant plasmids. Alternatively, it is advisable to perform linearization through double enzyme digestion before PCR to eliminate false positive caused by templates.

^f^. When obtaining linear plasmids through PCR amplification, it is advisable to use high fidelity DNA polymerases, such as BeyoFusion™ DNA Polymerase (D7220, D7221) from Beyotime, BeyoFusion™ DNA Polymerase (D7222, D7222B) or Pfu DNA Polymerase
(D7216,D7217).

^4.Preparation of fragments to be inserted^

^a^. If the inserted fragment is a very small fragment, such as 20-70bp, it can be prepared by synthesizing and annealing single stranded DNA (often referred to as primers). If the length of the inserted fragment is relatively long and cannot be directly synthesized, it can be prepared by PCR amplification.

^b^. Whether obtained through synthetic annealing or PCR amplification, the inserted
fragment must have a 15-25bp sequence on both sides that completely overlaps with the
vector or DNA fragment to be connected. Subsequently, the overlapping region will undergo recombination to obtain the expected recombinant plasmid.

^c^. When obtaining the fragment to be inserted through PCR amplification, a 15-25nt
sequence that completely overlaps with the vector or DNA fragment to be connected can be added to the 5' end of both primers during primer design. The requirements for primer design are the same as those for ordinary primer design, and it is necessary to appropriately avoid the secondary structure of the primer itself, the formation of primer dimers, and excessive GC content. After adding 15-25nt to the 5' end of the primer, it is still required to appropriately avoid the secondary structure, dimers, and excessive GC content of the entire sequence.

^d.^ The primer design method for inserting a single fragment can refer to the figure below. The schematic diagram in Figure 11A shows an example of the primer design method for conventional seamless cloning, and the obtained clones are completely seamless. The schematic diagram in Figure 11B shows an example of primer design method that preserves the enzyme cleavage sites on both sides of the insertion site. The obtained recombinant clone can retain the enzyme cleavage sites on both sides for subsequent enzyme cleavage identification or subcloning.

^e.^ The primer design method for inserting multiple fragments can refer to Figure 10. Usually, the sequence of the required cloned fragments can be listed first, and the adjacent parts between the fragments can be marked. From the adjacent parts, 15-20 bp can be selected as the overlapping sequence. The selection of overlapping sequences needs to meet the conventional primer design requirements, which include avoiding the secondary structure of the primer itself, the formation of primer dimers, and excessive GC content. Overlapping sequencess can be present in only one insertion fragment (red DNA sequence in Figure 10) or distributed across two fragment (blue DNA sequence in the figure below). The overlapping sequence should be designed with 8 G or C and 8 A or T as much as possible, and the annealing temperature should not be lower than 48 ℃ (roughly calculated with AT pairing as 2 ℃ and GC pairing as 4 ℃). Then, the overlapping sequence and gene specific sequence are used to design corresponding PCR primers. After each fragment is amplified separately, the obtained PCR product can be used for the recombination reaction of this kit after being subjected to agarose gel electrophoresis and gel cutting purification.

^5.Take out the four components of the reagent kit, place the Nuclease free water at room
temperature, and place the rest on ice. Refer to the table below to prepare the following reaction system:^

_Table 3: reaction system_

| Insert clip                                              | 1-2 fragments | 3-5 fragments | Negative control | Positive control                 |
| -------------------------------------------------------- | ------------- | ------------- | ---------------- | -------------------------------- |
| The molar ratio of each inserted fragment to the carrier | 3:1           | 1:1           | -                | -                                |
| Purified PCR fragments                                   | 10-100nɡ      | 10-100nɡ      |                  | 2μL DNA fragment(1100bp,30nɡ/μL) |
| Linearized carrier                                       | 50-100nɡ      | 50-100nɡ      | 50-100nɡ         | 2μL Linearized pUC18(25nɡ/μL)    |
| 2×Seamless Cloning Mix                                   | 10μL          | 10μL          | 10μL             | 10μL                             |
| Nuclease free water                                      | ?             | ?             | ?                | 6μL                              |
| Total volume                                             | 20μL          | 20μL          | 20μL             | 20μL                             |

^a.^ When 1-2 fragments are inserted and the molar ratio of fragments to carrier is around 3:1, the recombination efficiency is highest.

^b.^ When inserting a fragment smaller than 200bp, it is recommended to have a molar ratio of 5:1 between the inserted fragment and the carrier.

^6.The above reaction system was incubated at 50C for 15 minutes (1-2 fragments were
inserted), 30 minutes (3 fragments were inserted simultaneously), or 60 minutes (4-5 fragments were inserted simultaneously).If subsequent operations cannot be carried out immediately after the reaction is completed, the reaction sample can be stored at -20℃.^

# Use SanPrep Plasmid Mini Extraction Kit for plasmid small-amount extraction

^1.Objective^:

To use the SanPrep Plasmid Mini Extraction Kit for small-amount plasmid extraction (Sangon Biotech (Shanghai) Co., Ltd, China).

![Fig 7:SanPrep Plasmid Mini Extraction Kit](https://static.igem.wiki/teams/5924/wetlab/wiki/fig13sanprep-plasmid-mini-extraction-kit.webp)

^2.Content^:

Use the SanPrep Plasmid Mini Extraction Kit for small-amount plasmid extraction.This plasmid extraction kit uses the traditional alkaline lysis method, which is slow but highly versatile, and can extract low copy plasmids that are difficult to extract with RapidLyse.

^3.Preparation before the experiment^

① Shake the bacteria overnight at 37 ℃ for 12-16 hours in LB liquid medium containing specific antibiotics and freeze the glycerol bacteria.

② Add a whole RNase A to Buffer P1, shake well and mark it, then place it in a refrigerator at 4 ℃ with a shelf life of 6 months Add anhydrous ethanol to the Wash Solution (according to the label on the bottle), shake well and mark well.

^4.Experimental process^

① Cultivate the bacterial solution overnight and collect 1.5mL to 5mL of bacteria using a 2mL centrifuge tube.

② Discard the supernatant after collecting the bacteria. Remove Buffer P1 from the
refrigerator and add Buffer P1 250 μ L to the bacterial cells, then blow and resuspend the bacterial cells.

③Add 250 μ L Buffer P2 to the bacterial solution after resuspension, immediately cover the tube tightly and gently invert 5-10 times, and let it stand at room temperature for 2-4 minutes.

④Add 350 μ L of Buffer P3 to the solution, gently invert and mix 5-10 times.

⑤ Centrifuge in a centrifuge at a speed of 12000 rcf or above for 5-10 minutes. Transfer 750 μ L of supernatant to an adsorption column (with a collection tube installed), centrifuge at 9000rcf for 30 seconds, and discard the filtrate.

⑥(Do not perform this step in our laboratory) Add 500 μ L Buffer DW1 to the adsorption column, 9000rcf centrifuge for 30 seconds, discard the filtrate, and place the adsorption column back in the collection tube.

⑦ Add 500 μ L of Wash Solution along the wall of the adsorption column, centrifuge at 9000rcf for 30 seconds, discard the filtrate, and place the adsorption column back in the collection tube.

⑧ Repeat step ⑦ once. Then centrifuge the empty collection tube and adsorption column at 9000rcf for 1 minute. Discard the collection tube and place the adsorption column in a new 1.5mL centrifuge tube. Open the lid and let it stand at room temperature for 5 minutes.

⑨ Preheat the Elution Buffer in a metal bath at 55 ℃. Add 50-100 μ L of preheated Elution Buffer to the center of the adsorption column, let it stand at room temperature for 1-2 minutes, centrifuge at 9000 rcf for 30 seconds to elute the plasmid.

⑩ Measure concentration and run electrophoresis (optional)

_4.1.How to choose the most suitable elution volume_

The SanPrep plasmid kit has excellent elution efficiency. Usually, using 50 μ l of elution solution for elution can achieve a recovery rate of 85%. When using less than 40 μ l for elution, the plasmid concentration increases, but the overall yield decreases significantly. However, using more than 100 μ l of elution solution for elution does not increase the plasmid yield much, but the concentration decreases significantly. As shown in the figure, users can choose according to their own needs for subsequent experiments. Generally speaking, if the expected plasmid yield is low, less eluent is used to ensure that the obtained plasmid concentration is not too low. If the expected plasmid yield is high, more eluent can be used for elution.Troubleshooting Guide for Plasmid Preparation.

![Fig 8:Plasmid Concentration](https://static.igem.wiki/teams/5924/wetlab/wiki/fig14plasmid-concentration.webp)

# Chemical transformation of Trelief 5αcompetent cell

^1.Objective^:

To transform Trelief 5 α competent cells with plasmids for plasmid amplification and preservation.

^2.Content^:

Use of ice maker, pre-treatment of plasmid samples, use of Trelief 5 α competent cells.The constructed recombinant plasmids or purchased plasmid powder are generally in small quantities and need to be amplified in bacteria. We used Trelief 5 α E. coli competent cells from (Tsingke Biotechnology Co., Ltd, China) This cell has no endogenous nucleases and is mainly used for replicating and preserving plasmids. Compared with the commonly used DH5 α, Trelief 5 α can be transformed into ampicillin resistant plasmids using a rapid transformation method to improve speed.

^3.Preparation of samples to be transformed^

① Recombinant or linked products: no treatment required, directly used for conversion after the reaction is complete

② Complete plasmid and liquid: Dilute the liquid product to a DNA concentration of
approximately 20ng/μ L.

③ Plasmid dry powder: Centrifuge in a handheld centrifuge tube for few seconds (or centrifuge at 5000rpm for 1 minute), then dissolve in 20 μ L of enzyme free water. The remaining plasmids after transformation are stored in a -20 ℃ freezer.

④ Use iGEM distribution kit: Find the required plasmids and antibiotic resistance in the table. Use a gun tip to poke a hole in the corresponding small hole of the 384 well plate sealed with tin foil, add 10 μ L of enzyme free water, and let it stand for 10 minutes. Then extract the red solution containing DNA from the well (with a DNA concentration of approximately 100-300 pg/μ L). The remaining plasmid solution after transformation is stored together with a 384 well plate in a -20 ℃ freezer.

^4.Transformation operation^

① Make ice. Remove Trelief 5 α competent cells from the -80 ℃ freezer and immediately insert them into ice.

② After the competent cells have melted on ice (about 15 minutes), they can be divided into 2-5 tubes using clean 1.5mL centrifuge tubes, with each tube having a volume of 20μL -100μL. Add no more than 10% volume of recombinant product/linker product/plasmid to each competent cell tube (no more than 50ng should be added when transforming complete plasmids), gently tap the tube wall and mix well, and place on ice for 30 minutes.

③Place and stimulate competent cells through heat in a 42 ℃ water bath for 45s-90s, then immediately remove them and gently insert the centrifuge tube into ice for 2-3 minutes.
④In a sterile environment, add 1mL of LB liquid medium without antibiotics to the
centrifuge tube, shake at 37 ℃ and 200rpm for 60 minutes for recovery.

⑤Centrifuge the bacterial solution at 6000rpm for 5 minutes. In a sterile environment, discard the supernatant until 100-200 μ L is left, resuspend the bacterial cells with the remaining supernatant, and apply the bacterial solution to LB plates containing antibiotics that have been preheated in the incubator. Invert and culture at 37 ℃.

# Preparation and Transformation of Yeast Competent Cells by the LiAc Method

^Objective^:

 To prepare yeast competent cells for subsequent transformation with plasmid or fragment DNA.Content: Preparation of yeast competent cells and yeast transformation.

^1. Solution Preparation^

① 1M Lithium Acetate Solution: Dissolve 1.02g lithium acetate in 10mL pure water.  
Filter-sterilize.

② 50% Polyethylene Glycol Solution: Dissolve 100g PEG4000 in 150mL pure water. As PEG4000 dissolves slowly, use a magnetic stirrer on an IKA plate to accelerate dissolution. Filter-sterilize.

③ Carrier DNA Solution: Dissolve 200mg salmon sperm DNA in 20mL pure water. Mix thoroughly by repeated pipetting or stirring with a magnetic stirrer until completely
dissolved. Aliquot into small centrifuge tubes. Before each use, denature the Carrier DNA
solution by placing it in a boiling water bath for 5 minutes, then immediately transfer it to ice to cool. Repeat this cycle 3-4 times to ensure complete denaturation into single-stranded DNA (ssDNA).

^2. Yeast Pre-culture^

① Streak the frozen yeast stock onto a prepared YPD agar plate. Incubate inverted at 30°C until single colonies appear.

② Inoculate a single colony (approx. 1mm diameter) into 2-3mL of YPD liquid medium. Incubate at 30°C with shaking at 250 rpm for about 1-2 days, until the culture is visibly turbid.

③ Inoculate 0.5mL of the overnight culture into 50mL of YPDA liquid medium. Incubate at 30°C with shaking at 250 rpm for about 6-10 hours. Starting from the 2nd hour, measure the optical density of the culture at 600nm until the OD₆₀₀ reaches 0.6-1.2.

^3. Preparation of Yeast Competent Cells by the LiAc Method^

① Transfer an appropriate volume of the logarithmic-phase culture to a 15mL centrifuge tube (Appropriate volume: Final volume = 24000 / OD₆₀₀ μL; this protocol can prepare 12 tubes of yeast competent cells simultaneously). Centrifuge at 4430g for 2min and discard the supernatant.

② Wash the cell pellet once with sterile water. Centrifuge at 4430g for 2min and discard the supernatant.

③ Add 9mL sterile water and 1mL of 1M lithium acetate solution. Gently invert to mix (avoid pipetting). Centrifuge at 4430g for 2min and discard the supernatant.

④ Add 540μL sterile water and 60μL of 1M lithium acetate solution. Gently vortex to mix.

^4. Transformation of Yeast Competent Cells^

① Pipette 50μL of the prepared competent cells into a 1.5mL microcentrifuge tube.

Prepare the following transformation mixture and gently vortex to mix:

_Table 4: transformation mixture_

| Reagent                               | Volume                                               |
| ------------------------------------- | ---------------------------------------------------- |
| Competent cells                       | 50μL                                                 |
| 50% PEG solution                      | 240μL                                                |
| 1M Lithium acetate solution           | 36μL                                                 |
| Carrier DNA solution (denatured)      | 10μL                                                 |
| Plasmid (0.1-1μɡ) or Fragment (1-2μɡ) | XμL(up to 24μL total volume with DNA)                |
| Pure water                            | YμL(to make final volume 360μL if DNA volume < 24μL) |
| Total Volume                          | 360μL                                                |

_Note:The Reagents must be added in this sequence._

② (Optional step: Incubate at 30°C for 30 minutes). Heat shock at 42°C for 30 minutes.

③ After heat shock, cells can be spread directly onto appropriate selection plates (e.g., SD-dropout agar). Alternatively, because PEG can make spreading difficult, centrifuge at 12,000 rpm for 30 seconds, discard the supernatant, resuspend the cell pellet in sterile water, and then spread. Incubate plates at 30°C for 3-4 days until single colonies appear.

^5. Yeast Colony PCR^

① Prepare SD-dropout or other appropriate selection plates. Prepare a 20mM NaOH solution.

② Add 10μL of 20mM NaOH solution to a PCR tube. Using a sterile pipette tip or toothpick, pick a single colony. First streak the colony onto a plate for archive, then vigorously swirl the tip/toothpick in the NaOH solution to suspend cells.

③ Subject the NaOH solution containing yeast cells to heat lysis in a PCR thermocycler using the following program:

Heat Lysis: 95°C for 15 min*  
Hold: 4°C indefinitely (∞)*

④ Prepare the Rapid Taq Master Mix reaction system and perform PCR:

_Table 5: Rapid Tag Master Mix reaction system_

| Reagent               | Volume |
| --------------------- | ------ |
| 2×RapidTag Master Mix | 25μL   |
| Forward Primer        | 2μL    |
| Reverse Primer        | 2μL    |
| Yeast Lysate          | 1μL    |
| Pure Water            | 20μL   |

# Agarose Gel Electrophoresis

^1.Objective^:

To identify whether the sample (including PCR products, enzyme digestion products, plasmidextraction products, etc.) contains DNA of the correct size.

^2.Content^:

Preparation of electrophoresis materials, electrophoresis operation, and use of gel analyzer.Agarose gel electrophoresis is often used to identify whether DNA samples exist and whether the size of DNA samples is correct. The molecular weight of protein is usually identified by polyacrylamide gel electrophoresis. Since our laboratory does not do protein experiments, we only teach the process of agarose gel electrophoresis.

^3.Prepare electrophoresis buffer, gel and loading buffer containing dye^

①Preparation of electrophoresis buffer: Take 20mL of 50 × TAE buffer, dilute to 1000mL with pure water and mix well to obtain 1 × TAE buffer for electrophoresis.

②Preparation of gel: take the gel mold, install the gel holder and comb. Determine the required concentration of glue (m/V) based on the marker required for running glue . Weigh the corresponding mass of agarose, take the required 1 × TAE buffer, add it to a 100mL blue cap bottle, and boil the glue in the mic. 20-30 minutes of solidification is enough before use.rowave until clear. After slightly cooling, pour it into the mold.

③Preparation of Loading Buffer containing Dyes: Take a 10 × Loading Buffer (1.25 mL) and add 1.25 μ L of 10000 × GelRed nucleic acid dye (stored in a brown tube in the
medicine cabinet) and mix well.

![Fig 9:GelRed](https://static.igem.wiki/teams/5924/wetlab/wiki/fig3gelred.webp)

^4.Sample loading operation and electrophoresis^

①Place the gel in the electrophoresis tank, and note that the sample hole faces the black negative electrode side. Add 1×× TAE buffer until 0.3-0.5cm above the gel.

②Mix the sample and dye loading buffer on PE gloves or in centrifuge tubes. For markers, a formula of 2 μ L marker+2 μ L 10 × Loading Buffer is usually used. For samples, if only identification is required, transfer 4.5 μ L onto PE gloves and add 0.5 μ L of Loading Buffer to mix well. If the sample is recycled, add a loading buffer with a volume of 1/9 of the sample and mix well, then add the entire sample.

③Take the mixed sample and carefully tap it into the sample well. Be careful not to
puncture the gel or spill the sample.

④After loading the sample, cover the electrophoresis tank and turn on and connect the electrophoresis instrument. When only identifying, the electrophoresis voltage can be adjusted to 140V, and when recovering the product, the voltage is 110V. For small gels, after 15 minutes of 140V electrophoresis and 25 minutes of 110V electrophoresis, the blue purple front indicator will move to within 1cm of the end of the gel, and the gel running can be stopped. For large gels, please adjust the electrophoresis time by yourself.

^5.Gel imaging^

①After electrophoresis, close the switch of the electrophoresis instrument, take out the gel and put it in the Ultraviolet Analyzer, and close the dark box drawer tightly. Turn on the computer and the Ultraviolet Analyzer switch, and open the AllDox-X software.

②First, use white light to illuminate the gel, ensuring that the gel is positioned in the center of the image. Then take a UV photo and save the image. If the UV exposure is not ideal, you can (i) adjust the exposure time by pressing Auto, and (ii) drag the highlight shadow value in the upper right corner to adjust the brightness.

# Perform colony PCR reaction using 2x RapidTaq Mix

^1.Objective^:

To use rapid PCR to identify whether transformed colonies contain the correct genes.

^2.Content^:

Single colony selection operation, using Vazyme 2 × Rapid Taq Master Mix (Vazyme Biotech Co.,Ltd, China) for colony PCR.After transforming microorganisms with plasmids and overnight culturing on plates, several colony clones can grow on the plates. However, the colonies grown may not necessarily contain the target gene, and their ability to grow on screening plates may be due to spontaneous mutations or empty plasmid vectors are transferred into them. Therefore, it is necessary to use colony PCR to identify whether the correct plasmid is present. Here, we use fast and non fidelity Taq polymerase (which cannot recover Taq products as they are useless even if recovered) to perform PCR reaction using bacterial colonies as templates.

![Fig 10:Vazyme 2 × Rapid Taq Master Mix](https://static.igem.wiki/teams/5924/wetlab/wiki/fig12vazyme-2-rapid-taq-master-mix.webp)

^3.PCR system preparation^

① There are two design ideas for primers used in colony PCR: the first is to place upstream and downstream primers at both ends of the gene insertion sequence on the plasmid, and determine whether to insert the gene based on the length of the product; The second method is to place one of the upstream and downstream primers on the plasmid and the other in the gene, and determine whether to insert the gene based on whether there is a product.

② Remove Rapid Taq from the refrigerator, prepare primers and pure water.

③ Prepare the following reaction system:

_Table 6:Rapid Taq Master Mix reaction system_

| Reagent                 | Volume |
| ----------------------- | ------ |
| 2×Rapid Taq Master Mix  | 25μL   |
| Upstream Primer (10μM)  | 2μL    |
| Downstream Primer(10μM) | 2μL    |
| Enzyme free water       | 21μL   |

^4.Single colony selection operation^

① Under sterile conditions: mark the bacterial colonies to be picked at the bottom of the culture dish. Prepare a 1.5mL sterilized EP tube and add 1mL of liquid culture medium containing the corresponding antibiotic.

② Under sterile conditions: Use a sterilization gun or toothpick to gently scrape off a single colony from a agar plate. First, lightly dip a few times in the prepared PCR reaction solution, and then vigorously dip a few times in the liquid culture medium to preserve the bacteria. After preservation, seal the plate with Parafilm, and place it in a refrigerator at 4 ℃.

③ Inoculate the bacterial solution, cover the EP tube tightly, and shake culture at 37 ℃ and 200rpm. At the same time, run PCR reaction with the PCR reaction solution containing bacterial.

^5.PCR reaction^

_Perform the following procedure on the PCR machine:_

_Table 7: PCR machine procedure_

| Process                                                  | Temperature | Time  |
| -------------------------------------------------------- | ----------- | ----- |
| Pre denaturation                                         | 95℃         | 10min |
| Denaturation                                             | 95℃         | 15s   |
| Annealing                                                | Tm-(3-5℃)   | 15s   |
| Extension                                                | 72℃         | 40s   |
| Perform 25-30 cycles of denaturation-annealing-extension | -           | -     |
| Thoroughly extended                                      | 72℃         | 5min  |
| Insulation                                               | 4℃          | ∞     |

^6.subsequent operations^

① Electrophoresis, observe whether there are suitable bands.
This method may result in amplified product band slightly larger than theoretical.

② For colonies with negative PCR results, pour the bacterial solution and EP tube into the waste liquid tank, treat with 84 disinfectant diluted at 1:30, and then discard.

③For colonies with positive PCR results, continue shaking the bacterial solution for 3 hours. Under sterile conditions, divide the bacterial solution in the tube into two parts. One part, 500 μL, is placed in an EP tube and sealed with Parafilm for sequencing. The other part is inoculated into liquid culture medium for expanding. For Escherichia coli Trelief 5 α, add no more than 2/3 volume (8mL) of antibiotic containing culture medium to the shaking tube, inoculate a small amount of bacterial solution (this ratio is not a big deal), wrap the tube mouth with Parafilm, shake at 37 ℃ , 250rpm overnight (12-16h), and after the sequencing results are available, perform glycerol bacterial preservation and plasmid extraction.

# Sequencing of plasmid, etc

^1.Objective:^

To determine the correctness of the constructed plasmid through sequencing.

^1.Content^:

Design of sequencing primers, experimental process and result interpretation for first generation sequencing in biotechnology.After completing plasmid construction, sequencing is usually required. Although we use high fidelity DNA polymerases in the process of amplifying target genes or linearization vectors, it is still inevitable to introduce some mutations. Therefore, when we finally obtain several bacterial clones containing the final plasmid, we need to hand them over to the company for sequencing. We basically look for Sangon (Sangon Biotech (Shanghai) Co., Ltd, China) to perform first generation sequencing (i.e. Sanger sequencing).

^3.Design of sequencing primers^

When sequencing, we basically only need to test whether there is any erroneous amplification of the target gene and its upstream and downstream components. Due to the accurate read length of the first generation sequencing being only 700-1000bp, we need to design multiple primers.

_The requirements for primer design include:_

① Primers can be designed in the same direction, without the need to design upstream and downstream primers (because the sequencing results of upstream and downstream primers show the same region, and the results are complementary and consistent).

② The primer temperature should be between 55 ℃ and 60 ℃, meeting the general
requirements for designing primers while avoiding mismatches in the last few bases at the 3 'end.

③ Set a primer every 700-1000bp.

④ Some universal primers can be used, such as M13 primer, SK primer, etc., which have been labeled on Snapgene.

^4.Preparation of sequencing samples^

① To edit a text document (as biological sequencing can now be ordered online without sending an email), you need to provide: sample name (multiple clones of the same plasmid can be distinguished by adding numbers -1 and -2 at the end), sequencing region length, plasmid length, plasmid resistance, whether the sample is bacterial liquid or plasmid, sequencing primers and sequences.

② Post the sequencing requirements in the group chat and have the manager or consultant place an order for sequencing.

③ The experimenters prepare the sequencing samples. Send 500 μ L of bacterial solution or at least 500 ng of plasmid after extraction, and place them in a 1.5 mL centrifuge tube. Seal the tube with Parafilm and label it with the name. Prepare the biosynthetic sequencing sample tape (in the drawer below the weighing table), fill in the contact information of our laboratory (do not write the name of the experimenter), seal it, and wait for the staff to receive the sample. The staff of Sangon collect samples before 10 am and 5 pm every working day. Sequencing samples prepared after 5pm are temporarily stored in a 4-degree refrigerator and sent for testing the next morning.

^5.Sequencing result interpretation^

Normally, the sequencing results of plasmids will be available within one working day after receiving the sample, and the bacterial solution will be available within 1.5 working days (if it takes 2 working days, it must have failed). The sequencing results include a “.seq” file , which can be compared with the plasmid design draft using the snapgene tool - Align to Reference DNA Sequence - Align to Input Sequence.In the process of comparison, special attention should be paid to whether the bases in key regions have mutations, such as mutations, and whether they affect function. The 50th to 700th regions of Sanger sequencing results are reliable, and the reliability of sequencing results outside of this region depends on their sequencing peak plots. Usually, at least one of the multiple clones sent for testing is correct.

# Thermo Scientific FastDigest Ecl136II

^1.Protocol for Fast Digestion of Different DNA^

① Combine the following reaction components at room temperature in the order
indicated:

_Table 8:reaction components_

|                                             | Plasmid DNA    | PCR product  | Genomic DNA |
| ------------------------------------------- | -------------- | ------------ | ----------- |
| Water,nuclease-free(#R0581)                 | 15μL           | 17μL         | 30μL        |
| 10×FastDigest or 10×FastDigest Green Buffer | 2μL            | 2μL          | 5μL         |
| DNA                                         | 2μL(up to 1μɡ) | 10μL(~0.2μɡ) | 10μL(5μɡ)   |
| FastDigest enzyme                           | 1μL            | 1μL          | 5μL         |
| Total volume:                               | 20μL           | 30μL         | 50μL        |

② Mix gently and spin down.

③ Incubate at 37°C in a heat block or water thermostat for 5 min.

_Optional: Inactivate the enzyme by heating for 5 min at 65°C. _

④ If the FastDigest Green Buffer was used in the reaction, load an aliquot of the reaction mixture directly on a gel. Note: The FastDigest Green Buffer can be used as an electrophoresis loading buffer for any DNA sample at a final 1X concentration. Higher concentrations of FastDigest Green Buffer in the sample supply excess salt concentration
which may alter DNA mobility.

^2.Double and Multiple Digestion of DNA^

- The combined volume of the enzymes in the reaction mixture should not exceed 1/10 of the total reaction volume.
- Use 1 µL of each enzyme and scale up the reaction conditions appropriately.
- If the enzymes require different reaction temperatures, start with the enzyme that requires a lower temperature, then add the second enzyme and incubate at the higher temperature.

^3.Scaling up Plasmid DNA Digestion Reaction^

_Table 9:Plasmid DNA Digestion Reaction_

| DNA                                         | 1μɡ  | 2μɡ  | 3μɡ  | 4μɡ  | 5μɡ  |
| ------------------------------------------- | ---- | ---- | ---- | ---- | ---- |
| FastDigest enzyme                           | 1μL  | 2μL  | 3μL  | 4μL  | 5μL  |
| 10×FastDigest or 10×FastDigest Green Buffer | 2μL  | 2μL  | 3μL  | 4μL  | 5μL  |
| Total volume:                               | 20μL | 20μL | 30μL | 40μL | 50μL |

_Note: Increase the incubation time by 3-5 min if the total reaction volume exceeds 20 µL. Use water thermostat, air thermostats are not recommended due to the slow transfer ofheat to the reaction mixture._

^4.Recommendations for PCR product digestion ^

- When introducing restriction enzyme sites into primers for subsequent digestion and cloning of a PCR product, refer to [www.thermoscientific.com/fd](), Reaction Conditions Guide, to define the number of extra bases required for efficient cleavage.
- Use Thermo Scientific GeneJET PCR Purification Kit, K0701 to purify PCR product prior digestion in following cases:
- When PCR additives such as DMSO or glycerol where used, as they may affect the cleavage efficiency or cause star activity.
- When PCR Product will be used for cloning. Active thermophilic DNA polymerase still present in PCR mixture may alter the ends of the cleaved DNA and reduce the ligation Efficiency

# Preparation of common culture media and antibiotics

^1.Objective^:

To prepare culture medium and antibiotic solution.

^2.Content^:

Preparation of liquid and solid culture medium, use of sterilization pot, and preparation of antibiotic solution.The preparation of culture media and antibiotics is one of the commonly used techniques in biology. This section will teach the preparation of culture media, antibiotics, and two sterilization methods. Please note that the high-pressure sterilization pot can only be used by students who have undergone face-to-face training. Before entering the sterilization pot, please attach a yellow steam indicator tape. After steam sterilization, a black strip will appear on the tape to indicate the sterilization effect.

^3.Preparation of common culture media^:

① _LB medium_:  
used for cultivating various bacteria.Add yeast extract with an m/V ratio of 0.5%, 1% peptone, and 1% NaCl. If preparing a solidculture medium, add 1.5% agar. Add pure water and shake well. Sterilize with high-pressure steam at 121 ℃ for 20 minutes.

② *YPD Medium:*​​  
1% yeast extract, 2% peptone, 2% glucose. For solid medium, add 2% agar. Sterilize by autoclaving at 115°C for 15 minutes.
For YPDA medium supplemented with adenine, add 120 mg/L adenine hemisulfate.  
Glucose may be sterilized separately—i.e., prepare glucose and other component solutions independently, mix after sterilization—though combined sterilization has no significant impact.

③ *SD-Dropout Medium:*​​  
6.7 g/L Yeast Nitrogen Base (with ammonium sulfate), 20 g/L glucose. Supplement with specific amino acids or nucleotides as required (20–300 mg/L, see table below). For solid medium, add 2% agar. Sterilize by autoclaving at 115°C for 20 minutes.

_Table 10:amino acids or nucleotides_

| Category   | Component                  | Concentration(mɡ/L) |
| ---------- | -------------------------- | ------------------- |
| Nucleotide | L-Adenine hemisulfate salt | 40                  |
|            | L-Uracil                   | 20                  |
| Amino acid | L-Arginine HCl             | 20                  |
|            | L-aspartic acid            | 10                  |
|            | L-glutamic acid            | 10                  |
|            | L-Histidine                | 20                  |
|            | L-Leucine                  | 60                  |
|            | L-Lysine HCl               | 30                  |
|            | L-Methionine               | 20                  |
|            | L-Phenylalanine            | 50                  |
|            | L-serine                   | 375                 |
|            | L-Threonine                | 200                 |
|            | L-Tryptophan               | 40                  |
|            | L-Tyrosine                 | 30                  |
|            | L-Valine                   | 150                 |
|            | L-proline                  | 40                  |
|            | L-cysteine                 | 40                  |
|            | L-Isoleucine               | 40                  |
|            | Total Amount               | 1.375mg             |

When adding amino acids or nucleotides, avoid cross-contamination between nutrients.

④ *Ready-to-Use Powder Media (e.g., BHI, 2216E, and certain SD-dropout media):*​Follow the instructions provided on the packaging.

^4.Preparation of antibiotic storage solution^​

Preparation of antibiotic storage solutionThe following are all stored solution of 1000ⅹ concentration. After preparation, filter and sterilize with a 0.22 μ m filter membrane, and then transfer to brown EP tubes for storage. Add antibiotic storage solution to the culture medium at a ratio of 1000x when in use.

①*Carbenicillin (crb)*: Store at 50mg/mL and dissolve in water.

②* Kanamycin (kan)*: Store at 30mg/mL and dissolve in water.

③*Chloramphenicol (cpl)*: Store at 10mg/mL and dissolve in anhydrous ethanol.After preparing the antibiotic storage solution, store it in the refrigerator.

^5.Inverted tablet operation^

① After the solid culture medium is sterilized, keep waiting until the sterilization pot shows a temperature drop to 55 degrees. First, terminate the sterilization program, open the lid, then close the sterilization pot, remove the culture medium, and prepare antibiotics.

② Cool the culture medium to about 50 ℃ (not too hot when touch), add the corresponding antibiotic solution to the culture medium in a super clean bench (if preparing non antibiotic plates, it can be omitted), and shake well.

③ Open the culture dish packaging in the ultra clean bench. Pour 15-25mL of culture medium into each petri dish (to the mark on the petri dish) next to the alcohol lamp flame.

④ If the number of prepared plates is less than 10, open the lid of the culture dish by one slit, lay it on the ultra clean table, turn off the alcohol lamp, turn off the ultra clean table panel, adjust the wind speed to the maximum for 5-10 minutes until it solidifies, then put away the prepared plates and store them in a refrigerator at 4 ℃. If there are more than 10 prepared plates and there is no space to lay them flat in the ultra clean table, you can cover the culture dish cover and take them out outside to wait for solidification (which may cause excessive condensation of water vapor on the dish cover).

# Isolation and Extraction of Pir Protein Family

^1. Cell Culture^

Inoculate yeast strains harboring Pir family proteins into YPDA medium.Then, Incubate the culture for 20 hours.

^2. Cell Harvesting and Lysis^

Take a 400–800 mL aliquot of the culture.Centrifuge at 6000 rpm for 2 minutes to collect the pellet.Wash the cell pellet once with 15 mL of 0.1 mol/L potassium phosphate buffer (pH 8.0).Weigh the washed pellet.Resuspend the cells in ice-cold 0.1 mol/L potassium phosphate buffer to achieve a final concentration of approximately 20 mg/mL.Add phenylmethylsulfonyl fluoride (PMSF) to a final concentration of 1 mmol/L as a protease inhibitor.Lyse the yeast cell walls using an ultrasonic cell disruptor. Perform two cycles of sonication with the following parameters: total duration of 25 min, work time 15 s, interval time 25 s, and power 350 W.

^3.Cell Wall Separation^

Centrifuge the lysate at 3,000 × g for 5 minutes.Collect the pellet containing the cell wall fragments.Wash the pellet twice with 15 mL of potassium phosphate buffer.

^4. SDS Extraction and Washing^

Boil the cell wall pellet in 20 mL of SDS-Laemmli sample buffer for 10 minutes.Repeat this boiling extraction step a second time.Centrifuge the sample at 3,000 × g.Wash the resulting pellet sequentially with:15 mL of 0.1 mol/L potassium phosphate buffer,15 mL of 50 mmol/L Tris-HCl buffer (pH 7.5).Incubate the final pellet overnight in 30 mM NaOH.Centrifuge the sample at 3,000 × g.Collect the supernatant, which contains the extracted Pir family proteins.

# Freezing and Resuscitation of Glycerol Preserving Bacteria

^1.Objective^:
To preserve and revive glycerol bacteria to meet the needs of long-term storage.

^2.Content^:
Cryopreservation and recovery methods of glycerol bacteria. After the completion of strain construction or gene synthesis, the corresponding strains need to be preserved. Normally, we use the glycerol method to freeze bacterial strains, and strains frozen using this method can be safely stored for about a year.

^3.Cryopreservation of glycerol bacteria^

① Prepare a 50% glycerol aqueous solution, sterilize with high-pressure steam at 121 ℃ for 20 minutes, and cool; Prepare a 2mL cryovial with a blue cap and sterilize it in a blue cap bottle.

② Shake the bacteria to the logarithmic phase or earlier plateau phase.

③ Take 500 μ L of 50% glycerol solution and 500 μ L of bacterial solution, mix well in a cryovial, label and immediately freeze in a -40 ℃ freezer. 2. Recovery of glycerol bacteria.

4.Recovery of glycerol bacteria

① Take the glycerol bacteria out from the -40 ℃ refrigerator. Pick a small amount of
solidified bacterial liquid ice cubes in the ultra clean bench, draw lines on a suitable plate, invert and culture overnight.

② After every time of recovery, draw a line on the wall of the cryovial. After each revival of glycerol bacteria, a new tube of glycerol bacteria should be cryopreserved. When the glycerol bacteria are moved and revived (i.e. repeatedly frozen and thawed) for more than 3-5 times, their vitality will decrease and they should be discarded.

# Polyacrylamide Gel Electrophoresis and Coomassie Brilliant Blue Staining

^Objective^:
To perform protein gel electrophoresis and verify the presence of target proteins. Content: Native PAGE or SDS-PAGE, using Sangon Biotech C631100 or C631101 kit.

![Fig 11: sangon biotech c631100 0r c631101 kit](https://static.igem.wiki/teams/5924/wetlab/wiki/fig17sangon-biotech-c631100-or-c631101-kit.webp)

Polyacrylamide gel electrophoresis (PAGE) is one of the commonly used methods for separating protein components. Common types of PAGE include non-denaturing Native PAGE and denaturing SDS-PAGE. Proteins in Native PAGE can retain their activity after electrophoresis, whereas those in SDS-PAGE cannot. For target protein identification, since our laboratory does not have the experimental conditions for performing Western blot analysis, we only conduct Coomassie Brilliant Blue staining. If the sensitivity of Coomassie Brilliant Blue staining is insufficient, other staining kits can be purchased (such as silver staining).

^1. Target Protein Extraction and Sample Preparation^

① Prepare 100mM PMSF solution: Dissolve 174mg PMSF in 10mL water, store at 4°C refrigerator, no need to protect from light.

② Extract proteins using appropriate methods. After extraction, add PMSF solution at 100× concentration to the protein samples to achieve a final PMSF concentration of 1mM.
PMSF is a protease inhibitor that ensures protein stability and prevents denaturation when added.

③ Native-PAGE: Add Native Loading Buffer to samples at 6× concentration and mix thoroughly.

④ SDS-PAGE: Add SDS Loading Buffer to samples at 5× concentration and mix thoroughly. Heat at 99°C for 10-15 min in a PCR machine, metal bath, or water bath to fully denature proteins.  
Prepared protein samples should be stored on ice. For short-term storage, keep at 4°C; for long-term storage, keep at -20°C. Avoid prolonged storage at room temperature.

^2.1 Preparation of SDS Polyacrylamide Gel (C631100)^

① Assemble the gel casting apparatus:  
Assemble clean glass plates, two plastic spacers, and ceramic plates, then clamp them in the gel caster and securely fix to the base of the mold.

② Optional:  
Add 1mL water between the glass plates and ceramic plates to check for leaks. If leakage occurs, reassemble; if not, pour out the water.

③ Prepare the lower resolving gel:  
Retrieve the reagent kit (ensure correct kit is selected). APS should be dissolved immediately upon receiving the kit and aliquoted in volumes no more than 500μL per tube, stored at -20°C. Prepare according to the required concentration by referring to the table below. (Approximately 5mL is needed for each gel). Add TEMED and APS last during preparation.

Note that almost all components in this kit are toxic; gloves must be worn, it is recommended to wear a mask, and avoid contaminating non-protein electrophoresis areas with reagents.

_Table 11:Component Volumes for 6% Resolving Gel(mL)_

| Component          | Total Volumes     |       |       |       |       |      |
| ------------------ | ----------------- | ----- | ----- | ----- | ----- | ---- |
|                    | 5                 | 10    | 15    | 20    | 30    | 50   |
|                    | Component Volumes |       |       |       |       |      |
| Distilled water    | 2.7               | 5.4   | 8.1   | 10.8  | 16.2  | 27.0 |
| 30% Acr-BIS (29:1) | 1.0               | 2.0   | 3.0   | 4.0   | 6.0   | 10.0 |
| Gel buffer A       | 1.25              | 2.5   | 3.75  | 5.0   | 7.5   | 12.5 |
| 10% APS            | 0.05              | 0.1   | 0.15  | 0.2   | 0.3   | 0.5  |
| TEMED              | 0.005             | 0.010 | 0.015 | 0.020 | 0.030 | 0.05 |

_Table 12:Component Volumes for 8% Resolving Del(mL)_

| Component          | Total Volumes     |       |       |       |       |      |
| ------------------ | ----------------- | ----- | ----- | ----- | ----- | ---- |
|                    | 5                 | 10    | 15    | 20    | 30    | 50   |
|                    | Component Volumes |       |       |       |       |      |
| Distilled water    | 2.4               | 4.7   | 7.1   | 9.5   | 14.2  | 23.7 |
| 30% Acr-BIS (29:1) | 1.3               | 2.7   | 4.0   | 5.3   | 8.0   | 13.3 |
| Gel buffer A       | 1.25              | 2.5   | 3.75  | 5.0   | 7.5   | 12.5 |
| 10% APS            | 0.05              | 0.1   | 0.15  | 0.2   | 0.3   | 0.5  |
| TEMED              | 0.004             | 0.008 | 0.012 | 0.016 | 0.024 | 0.04 |

_Table 13:Component Volumes for 10% Resolving Gel(mL)_

| Component          | Total Volumes     |       |       |       |       |      |
| ------------------ | ----------------- | ----- | ----- | ----- | ----- | ---- |
|                    | 5                 | 10    | 15    | 20    | 30    | 50   |
|                    | Component Volumes |       |       |       |       |      |
| Distilled water    | 2.0               | 4.1   | 6.1   | 8.1   | 12.2  | 20.3 |
| 30% Acr-BIS (29:1) | 1.7               | 3.3   | 5.0   | 6.7   | 10.0  | 16.7 |
| Gel buffer A       | 1.25              | 2.5   | 3.75  | 5.0   | 7.5   | 12.5 |
| 10% APS            | 0.05              | 0.1   | 0.15  | 0.2   | 0.3   | 0.5  |
| TEMED              | 0.003             | 0.006 | 0.009 | 0.012 | 0.018 | 0.03 |

_Table 14:Component Volumes for 12% Resolving Gel(mL)_

| Component          | Total Volumes     |       |       |       |       |      |
| ------------------ | ----------------- | ----- | ----- | ----- | ----- | ---- |
|                    | 5                 | 10    | 15    | 20    | 30    | 50   |
|                    | Component Volumes |       |       |       |       |      |
| Distilled water    | 1.7               | 3.4   | 5.1   | 6.8   | 10.2  | 17.0 |
| 30% Acr-BIS (29:1) | 2.0               | 4.0   | 6.0   | 8.0   | 12.0  | 20.0 |
| Gel buffer A       | 1.25              | 2.5   | 3.75  | 5.0   | 7.5   | 12.5 |
| 10% APS            | 0.05              | 0.1   | 0.15  | 0.2   | 0.3   | 0.5  |
| TEMED              | 0.003             | 0.006 | 0.009 | 0.012 | 0.018 | 0.03 |

_Table 15:Component Volumes for 15% Resolving Gel(mL)_

| Component          | Total Volumes     |       |       |       |       |      |
| ------------------ | ----------------- | ----- | ----- | ----- | ----- | ---- |
|                    | 5                 | 10    | 15    | 20    | 30    | 50   |
|                    | Component Volumes |       |       |       |       |      |
| Distilled water    | 1.2               | 2.4   | 3.6   | 4.8   | 7.2   | 12.0 |
| 30% Acr-BIS (29:1) | 2.5               | 5.0   | 7.5   | 10.0  | 15.0  | 25.0 |
| Gel buffer A       | 1.25              | 2.5   | 3.75  | 5.0   | 7.5   | 12.5 |
| 10% APS            | 0.05              | 0.1   | 0.15  | 0.2   | 0.3   | 0.5  |
| TEMED              | 0.003             | 0.006 | 0.009 | 0.012 | 0.018 | 0.03 |

④ Gel casting:  
Evenly add the prepared resolving gel solution to the mold using a 1mL pipette tip, avoiding addition to only one spot or introducing bubbles. Add the gel solution to approximately 1-1.5cm from the upper edge opening of the ceramic plate. Then cover the gel with 1mL anhydrous ethanol to flatten the gel surface. Let stand at room temperature for 15-20 min.

⑤ Prepare the upper stacking gel: Prepare according to the table below. Approximately 1.5mL is needed for each gel in our mold.

_Table 16:Component Volumes for 5% Stacking Gel(mL)_

| Component          | Total Volumes     |       |       |       |       |      |
| ------------------ | ----------------- | ----- | ----- | ----- | ----- | ---- |
|                    | 5                 | 10    | 15    | 20    | 30    | 50   |
|                    | Component Volumes |       |       |       |       |      |
| Distilled water    | 0.67              | 1.0   | 1.33  | 2.0   | 2.7   | 3.3  |
| 30% Acr-BIS (29:1) | 0.33              | 0.5   | 0.67  | 1.0   | 1.3   | 1.7  |
| Gel buffer A       | 1.0               | 1.5   | 2.0   | 3.0   | 4.0   | 5.0  |
| 10% APS            | 0.02              | 0.03  | 0.04  | 0.06  | 0.08  | 0.1  |
| TEMED              | 0.002             | 0.003 | 0.004 | 0.006 | 0.008 | 0.01 |

⑥ Gel casting:  
After the lower gel has solidified, pour off the surface ethanol and invert the mold to completely drain the ethanol. Then pour the upper gel solution over the lower gel, using the same technique as in step ④. Add the gel solution until it is flush with the upper edge opening of the ceramic plate, then quickly and gently insert the comb, and let stand at room temperature for 15-20 min.

⑦ If not used immediately, remove the gel (the comb may remain inserted), wrap in paper towels and place in a plastic bag, add a small amount of distilled water or electrophoresis buffer to keep the gel moist, and store at 4°C for up to 2 days.

^2.2 Preparation of Non-Denaturing Polyacrylamide Gel (C631101)^

The operational procedures and precautions for this method are consistent with section 2.1, just ensure the correct reagent kit is used.

^3. Electrophoresis^

① Prepare electrophoresis buffer: Dissolve 18.8g glycine and 3g Tris in 1L distilled water. For SDS-PAGE, add 1g/L SDS after glycine and Tris have dissolved.  
SDS tends to produce bubbles after dissolving; it is recommended not to invert or shake vigorously during preparation and storage.

② Remove the glass plates containing the gel and rinse off excess gel from the surface with distilled water. Align the sample loading indicator transparent sheet with the comb on the glass plate side, remove the comb, orient the ceramic plate inward, and assemble into the electrophoresis tank. Add electrophoresis buffer to the inner chamber of the electrophoresis tank until it covers the upper edge of the gel. Add electrophoresis buffer to the outer chamber until it covers the positive electrode but not the negative electrode.

③ Add 10μL protein samples to each well using white pipette tips. For SDS-PAGE, add 2-5μL of molecular weight marker to the first lane. If there are empty lanes on both sides of the samples, add diluted, protein-free 1× Loading Buffer to these empty lanes. Remove the sample loading indicator transparent sheet after loading.  
Adding empty loading buffers on both sides prevents edge effects that could cause band distortion.  
Markers are only used in SDS-PAGE. Please follow the manufacturer's instructions for use (whether Loading Buffer is needed, size range, suitable gel concentration, etc.).

④ Electrophoresis:  
First run at 90V for 20-30 min to allow proteins to fully enter the resolving gel, at which point the bromophenol blue band should be compressed into a straight line. Then run at 120V (can be increased to 160V for SDS-PAGE) for 1-2 hours until the bromophenol blue band reaches the bottom of the gel. Alternatively, run continuously at 90V throughout.

^4. Coomassie Brilliant Blue Staining and Destaining^

① Remove the gel after electrophoresis and rinse with distilled water. Carefully separate the glass plates using a spatula under water or running water and remove the gel, placing it in a clean container.

② Pour Coomassie Brilliant Blue solution over the gel until it is covered, and stain on a shaker at low speed for 5-10 min.

③ After staining, pour the Coomassie Brilliant Blue solution back into the original bottle for recycling, then rinse the gel once with distilled water.

④ Add distilled water to the gel until it is covered, and destain on a shaker at low speed for 5-10 min until the background is clear and protein bands are distinct. Alternatively, destaining solution (50% ethanol, 10% acetic acid aqueous solution) can be used for faster destaining, but this will weaken protein bands and cause gel shrinkage.

⑤ Remove the gel and directly photograph or analyze using white light in a gel documentation system.

^Rapid Staining Protocol (Coomassie Brilliant Blue G250)^​​

​*1.1 Preparation of Coomassie Brilliant Blue G250 Staining Solution*​

Dissolve 0.2 g of G250 in 100 mL of water (heating to 50°C is required to facilitate dissolution). After cooling, add 100 mL of 2N H₂SO₄. Incubate the solution at room temperature for 3 hours to overnight. Then, clarify the solution by filtration through filter paper. To the filtered solution, carefully add 22.2 mL of 10N KOH, followed by 28.7 g of TCA (trichloroacetic acid). Mix thoroughly and allow the solution to stand at room temperature for more than 3 hours. Clarify the solution by filtration again to obtain a final amber-brown solution, which should be free of any blue precipitate.

​*1.2 Staining Procedure*​

Submerge the gel completely in the prepared staining solution. Protein bands will typically become visible after approximately 15 minutes of staining. The intensity and sensitivity of the stained bands will further increase over several hours.

​*1.3 Stability*​

The staining solution remains stable at room temperature for approximately 2 to 3 weeks.

# Extraction of Yeast Genomic DNA

^Objective^:

 To extract genomic DNA from yeast.

^Content^:

Includes the principle and procedure of yeast genomic DNA extraction, and the use of the Sangon Biotech Rapid Yeast Genomic DNA Isolation Kit.

![Fig 12:sangon biotech rapid yeast genomic dna isolation kit](https://static.igem.wiki/teams/5924/wetlab/wiki/fig16sangon-biotech-rapid-yeast-genomic-dna-isolation-kit.webp)

^1. Yeast Pre-culture^

① Inoculate and culture yeast in liquid medium overnight at 30°C, 250 rpm, until obvious turbidity is observed.

^2. Reagent Preparation^

① Add the entire contents of the Snailase Storage Buffer (from the kit) to the Snailase powder. Vortex to mix thoroughly until dissolved. Aliquot the solution into microcentrifuge tubes and store at -20°C.

^3. Procedure^

① Take a 1.5 mL microcentrifuge tube and weigh it on an analytical balance. Add 1-2 mL of the yeast culture to the tube. Centrifuge at 10,000 rpm for 1 min and discard the supernatant.

② After collecting the yeast cell pellet, weigh the tube again on the analytical balance and calculate the wet weight of the yeast cells.

③ To the tube, add 600 μL of Snailase Reaction Buffer, 2.4 μL of β-mercaptoethanol, and 50 μL of the prepared Snailase solution per 20 mg of yeast wet weight. Incubate in a 37°C water Bath for 6 hours, inverting the tube to mix every 1 hour during the incubation.

④ Centrifuge at 10,000 rpm for 2 min and discard the supernatant.

⑤ Add 400 μL of Buffer Digestion to the pellet. Vortex to mix thoroughly. Incubate in a 65°C water bath for 1 hour, inverting the tube to mix every 10 minutes during the incubation.

⑥ Add 200 μL of Buffer PY to the tube. Invert to mix well and place at -20°C for 5 minutes.

⑦ Centrifuge at 10,000 rpm for 5 min. Carefully transfer the supernatant (approximately 500-550 μL) to a new microcentrifuge tube. Add an equal volume of isopropanol to the supernatant. Invert the tube 5-8 times to mix and let it stand at room temperature for 2-3 minutes. Centrifuge at 10,000 rpm for 5 min and discard the supernatant.

⑧ Add 1 mL of 75% ethanol to the pellet. Invert the tube gently to float/loosen the pellet and wash for 1-3 minutes. Centrifuge at 10,000 rpm for 5 min at room temperature and discard the supernatant. Repeat this washing step once more.

⑨ Completely remove all residual supernatant. Leave the tube open for 5-10 minutes to allow the ethanol to evaporate completely.

⑩ Dissolve the obtained DNA pellet in 50-100 μL of TE Buffer.

# Detect low-abundance proteins in gels using low-background silver staining

^1.Operation Steps:^

_1.1_.Take out the polyacrylamide gel after electrophoresis and rinse the gel with double-distilled water. Prepare the required amount of Solution B and Solution D by diluting with double-distilled water according to the volume needed, and keep the following steps at room temperature.

_1.2_.Add 20 mL of double-distilled water, place on a shaker, and oscillate for 5 minutes.

_1.3_.Pour out the double-distilled water, add 20 mL of fixing solution containing 50% ethanol and 12% acetic acid and 55 μl of Solution A, place on a shaker, and oscillate for 60 minutes.

_1.4_.Pour out the solution, add 20 mL of 50% ethanol, place on a shaker, and oscillate for 5 minutes, repeat three times.

_1.5_.Pour out 50% ethanol, add 20 mL of one-fold volume of Solution B, place on a shaker, and oscillate for 1 minute.

_1.6_.Pour out Solution B, add 20 mL of double-distilled water, place on a shaker, and oscillate for 1 minute, repeat three times.

_1.7_.Pour out the double-distilled water, add 20 mL of Solution C and 43 μl of Solution A sequentially, place on a shaker, and oscillate for 20 minutes.

_1.8_.Pour out the mixture, add 20 mL of double-distilled water, place on a shaker, and
oscillate for 1 minute, repeat twice.

_1.9_.Pour out the mixture of Solution D and Solution A, add 20 mL of one-fold volume of Solution D and 28 μl of Solution A, slowly shake until the protein bands have sufficient color intensity (about 2-3 minutes).

_1.10_.Pour out the mixed solution of Solution D and Solution A, add 20 mL of fixing solution containing 50% ethanol and 12% acetic acid to terminate the color reaction, place on a shaker, and oscillate for 5 minutes.

_1.11_.Pour out the liquid, add 20 mL of double-distilled water, place on a shaker, and oscillate for 5 minutes before observing the colored bands and proceeding to subsequent experiments.
