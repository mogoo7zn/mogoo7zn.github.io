import React, { useEffect, useState } from 'react';
import fs from 'fs/promises';
import path from 'path';
import Layout from '../components/layout/Layout';
import ContentPageLayout from '../components/layout/ContentPageLayout/ContentPageLayout';
import DataTable from "../components/layout/PartsPageLayout/DataTable"
import heading_styles from '../components/layout/ContentPageLayout/ContentPageLayout.module.scss';

const PartsPage = ({ pageData }) => {
  const columns = [
    { key: 'partNumber', label: 'Part Number', width: '20%', align: 'center' },
    { key: 'name', label: 'Name', width: '15%', align: 'center' },
    { key: 'type', label: 'Type', width: '20%', align: 'center' },
    { key: 'description', label: 'Description', width: '45%', align: 'left' },
  ];

  const composite = [
    {
      partNumber: 'BBa_253UM26D',
      name: 'pYES2-%PGAL1-Pir1p-SNAP25-(TEV)-Mating factor alpha%-CYC1',
      type: 'Coding',
      description: 'This substrate tag was constructed  to detect a trace of TEV protase which we chose to simulate the BoNT/A.This fusion proteins displayed on the cell wall surface of the Substrate Strain throught yeast surface display system',
    },
    {
      category: 'Composite Parts',
      partNumber: 'BBa_25RUA0B9',
      name: 'pUC19-%sTF%',
      type: 'Coding',
      description: 'This fusion protein composes of DNA-binding domain of Gal4 and pheromone-responsive domain of Ste12,replacing Ste12 as a component of the signal pathway operating downstream of Ste2. It responds to the  signal and triggers the transcription of reporter gene,%MjDOD%',
    }
  ]

  const basic = [
    {
      category: 'Basic Parts',
      partNumber: 'BBa_K5371006',
      name: '%GAL4%',
      type: 'Coding',
      description: 'A gene from %Saccharomyces cerevisiae% S288C encoding a galactose-responsive transcription factor',
    },
    {
      category: 'Basic Parts',
      partNumber: 'BBa_K2637056',
      name: '%GAL80%',
      type: 'Coding',
      description: 'A gene from %Saccharomyces cerevisiae% S288C encoding a transcription regulator which inhibits transcriptional activation by Gal4p',
    },
    {
      category: 'Basic Parts',
      partNumber: 'BBa_K3173005',
      name: '%STE2%',
      type: 'Coding',
      description: 'A gene from %Saccharomyces cerevisiae% S288C encoding the Mating factor alpha receptor',
    },
    {
      category: 'Basic Parts',
      partNumber: 'BBa_25Y5QTBF',
      name: '%STE12%',
      type: 'Coding',
      description: 'A gene from %Saccharomyces cerevisiae% S288C encoding a component of signal pathway operating downstream of STE2',
    },
    {
      category: 'Basic Parts',
      partNumber: 'BBa_25KNR1N3',
      name: '%MjDOD%',
      type: 'Coding',
      description: '%MjDOD% was selected  as the reporter gene to generate the visual output.This enzyme oxidizes L-DOPA to betalamic acid, Betalamic acid spontaneously reacts with endogenous amino acids or externally supplied amine donors, producing various colored betaxanthins',
    },
    {
      category: 'Basic Parts',
      partNumber: 'BBa_25W6SH7R',
      name: 'Pir1p',
      type: 'Coding',
      description: 'Pir1p was selected to anchor the N-terminus of the substrate tag to the cell wall',
    },
    {
      category: 'Basic Parts',
      partNumber: 'BBa_253NFXE9',
      name: 'SNAP25',
      type: 'Coding',
      description: 'Synaptosome-associated protein of 25 kDa (SNAP-25) serves as the substrate for botulinum neurotoxin type A (BoNT/A). BoNT/A cleaves SNAP25 at residues 197–198, thereby releasing the Mating factor alpha at the C-terminus of the substrate tag',
    },
    {
      category: 'Basic Parts',
      partNumber: 'BBa_25CSFL8E',
      name: 'Mating factor alpha',
      type: 'Coding',
      description: 'Upon proteolytic release by BoNT/A or TEV protease, the α-factor binds to the Ste2 receptor on the plasma membrane of Signal-transferring Strain, thereby initiating downstream signal transduction that culminates in activation of the reporter gene',
    },
    {
      category: 'Basic Parts',
      partNumber: 'BBa_25JA50EQ',
      name: '%URA3% marker gene',
      type: 'Coding',
      description: "Enables orotidine-5'-phosphate decarboxylase activity. Involved in 'de novo' pyrimidine nucleobase biosynthetic process and UMP biosynthetic process. It is routinely employed for screening of the target yeast strain",
    },
    {
      category: 'Basic Parts',
      partNumber: 'BBa_J435273',
      name: 'ScHIS3-marker',
      type: 'Cloning Plasmid',
      description: 'The plasmid carries the selection marker %HIS3%',
    },
    {
      category: 'Basic Parts',
      partNumber: 'BBa_K4873002',
      name: 'pUC19',
      type: 'Cloning Plasmid',
      description: 'Cloning vector with an ampicillin resistance marker',
    },
    {
      category: 'Basic Parts',
      partNumber: 'BBa_K5471003',
      name: 'pUC57',
      type: 'Cloning Plasmid',
      description: 'Cloning vector with an ampicillin resistance marker',
    },
    {
      category: 'Basic Parts',
      partNumber: 'BBa_25YQ5CKG',
      name: 'pYES2',
      type: 'Shuttle Plasmid',
      description: 'High-copy episomal vector for galactose-inducible expression of proteins in %Saccharomyces cerevisiae%',
    },
    {
      category: 'Basic Parts',
      partNumber: 'BBa_25XSHZU8',
      name: 'pUC19-%STE2%-%URA3%',
      type: 'Cloning Plasmid',
      description: 'A plasmid constructed to store donor sequence designed to knock out %STE2%',
    },
    {
      category: 'Basic Parts',
      partNumber: 'BBa_2544NN57',
      name: 'pUC19-%GAL80%-%HIS3%',
      type: 'Cloning Plasmid',
      description: 'A plasmid constructed to store donor sequence designed to knock out %GAL80%',
    },
    {
      category: 'Basic Parts',
      partNumber: 'BBa_258H678M',
      name: 'pUC19-%GAL4%-%URA3%',
      type: 'Cloning Plasmid',
      description: 'A plasmid constructed to store donor sequence designed to knock out %GAL4%',
    },
    {
      category: 'Basic Parts',
      partNumber: 'BBa_25FYVHU9',
      name: 'GAL1 promoter',
      type: 'Promoter',
      description: 'An inducible promoter which is widely used in yeast protein expression system. It is tightly repressed in the presence of glucose and strongly induced in the presence of galactose',
    },
    {
      category: 'Basic Parts',
      partNumber: 'BBa_K3126010',
      name: 'CYC1 terminator',
      type: 'Terminator',
      description: 'This part encodes the transcriptional terminator of the %CYC1% gene from Saccharomyces cerevisiae. Ensures proper transcription termination and polyadenylation of mRNA transcripts',
    },
    {
      category: 'Basic Parts',
      partNumber: 'BBa_25SZUVYI',
      name: 'TEV protease cleavage site–α-factor encoding region',
      type: 'Coding',
      description: 'A gene from %Saccharomyces cerevisiae% S288C alpha type encoding a Alpha-factor mating pheromone.Since botulinum toxin is legally prohibited from use in our experiments, we employed TEV protease as a surrogate.Therefore we added the cleavage site of TEV protease',
    },
    {
      category: 'Basic Parts',
      partNumber: 'BBa_25C0C6QI',
      name: 'pUC19-%FAR1%-%URA3%',
      type: 'Cloning Plasmid',
      description: 'A plasmid constructed to store donor sequence designed to knock out %FAR1%',
    },
    {
      category: 'Basic Parts',
      partNumber: 'BBa_K1470002',
      name: '%GAL4% DBD',
      type: 'Coding',
      description: '%GAL4% DNA-binding domain used to create a fusion protein called sTF, which triggers the transcription of reporter gene',
    },
    {
      category: 'Basic Parts',
      partNumber: 'BBa_25555HKK',
      name: '%STE12% PRD',
      type: 'Coding',
      description: 'STE12 pheromone-responsive domain used to create a fusion protein called sTF, triggering transcription of reporter gene',
    },
    {
      category: 'Basic Parts',
      partNumber: 'BBa_K5477001',
      name: 'pSTE12',
      type: 'Promoter',
      description: 'Promoter of %STE12%, activated by MAPK signaling cascade, responsible for inducing mating and pseudohyphal/invasive growth genes',
    },
    {
      category: 'Basic Parts',
      partNumber: 'BBa_256CPPNO',
      name: 'ste12 terminator',
      type: 'Terminator',
      description: 'Terminator of %STE12%, encoding a component of signal pathway operating downstream of STE2',
    },
    {
      category: 'Basic Parts',
      partNumber: 'BBa_25VY4NHQ',
      name: 'pYES2-PGAL1-%MjDOD%-CYC1',
      type: 'Plasmid',
      description: 'This plasmid can preliminarily validate the feasibility of the pigment synthesis scheme. The enzyme can convert L-DOPA in the culture medium into betaxanthin. After transforming this plasmid into yeast, addition of galactose can also induce the reaction',
    },
  ];





  return (
    <ContentPageLayout pageData={pageData}>
      <h2 className="block w-full text-center text-orange-500 text-xl font-semibold"
        style={{ margin: '2rem 0', color: 'rgb(168, 12, 5)'}}>
      Basic Parts
      </h2>
      <DataTable columns={columns} data={basic} />

      <h2 className="block w-full text-center text-orange-500 text-xl font-semibold"
        style={{ margin: '2rem 0', color: 'rgb(168, 12, 5)'}}>
        Composite Parts
      </h2>
      <DataTable columns={columns} data={composite} />
    </ContentPageLayout>
  );
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'static', 'data', 'wet-lab', 'parts.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const pageData = JSON.parse(jsonData);

  return { props: { pageData } };
}

PartsPage.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

PartsPage.layoutOptions = {
  showGrid: false, // 明确指令：不显示 Grid
};

export default PartsPage;
