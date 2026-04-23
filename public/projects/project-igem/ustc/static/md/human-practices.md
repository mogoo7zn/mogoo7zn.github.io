# Overview

In advancing our project, the "Selective Proteolytic Botulinum Toxin Bioassay Based on Yeast (S.P.Y.)", we carried out multi-faceted and systematic work centered around our core objective: to build an efficient, safe, and practical platform for detecting Botulinum Neurotoxin Type A (BoNT/A). This work spanned various levels, encompassing not only the entire technical chain – from chassis organism selection and dual-yeast system construction to signal pathway optimization and the implementation of detection methods – but also extended to practical applications, including food safety investigations, market demand analysis, and public communication. This comprehensively demonstrates the complete closed-loop process of our project, from laboratory research to societal application. The following sections will elaborate in detail on our key efforts in project design, refinement, investigation, and promotion.

# 1.Project Initial Design

In the early stages of our project, we planned to construct a human-derived signaling pathway in yeast to achieve signal amplification for detection, and designed a fusion protein using SNAP-25 as a linker peptide to achieve BoNT/A cleavage-dependent signal input. When consulting ^Professor Tang Shan^ on the design of the fusion protein, she carefully reviewed our PPT and astutely pointed out that the signal amplification pathway in the mid-term project design was overly complex, which could affect the system's feasibility and stability. This suggestion prompted us to re-examine the overall architecture.

![Professor Tang Shan](https://static.igem.wiki/teams/5924/hp/interview/tangshan.webp)

At the same time, ^Professor Cao Can^, from his expertise in GPCR and FRET technologies, pointed out that most human-derived GPCR receptors are difficult to express correctly in yeast, and that the FRET method relies on specialized equipment such as microscopes or spectrophotometers, which is not conducive to convenient visual detection. His advice guided us in a new direction: we shifted our focus to seeking a more intuitive output method and ultimately selected betaxanthin as the color-based signal output, replacing the original fluorescent protein approach.

![Professor Cao Can](https://static.igem.wiki/teams/5924/hp/interview/cao-can.webp)

During the investigation of utilizable endogenous signaling pathways in yeast, ^Professor Hong Jiong^ provided us with significant insights. The synNotch protease detection pathway he recommended became one of the key inspirations for our later construction of the "dual-yeast system." Considering that Notch proteins might not fold correctly in yeast, we eventually decided to adopt the endogenous yeast α-factor/Ste2 system as the signal transmission module, constructing a dual-yeast detection system composed of a "Substrate-acting Strain" and a "Signal-transferring Strain."

![Professor Hong Jiong](https://static.igem.wiki/teams/5924/hp/interview/hong-jiong.webp)

After the initial design of the system, ^Professor Hong Jiong^ further raised a critical question: could the uncleaved fusion protein cause false positives due to premature binding of the α-factor to the Ste2 receptor? To address this, we consulted ^Doctoral student Liu Yuan from Peking University^, who suggested that if the linker in the fusion protein could spatially constrain the α-factor, it might prevent recognition in the uncleaved state. Although subsequent investigation ruled out the risk of false positives caused by this factor, his advice deepened our understanding of protein structure-function relationships.

![Doctoral student Liu Yuan from Peking University](https://static.igem.wiki/teams/5924/hp/interview/liuyuan-pku.webp)

#  2.Project Design Refinement

![Professors are guiding our project](https://static.igem.wiki/teams/5924/hp/interview/dabian.webp)

During our defense with the advising professor, the teacher provided a suggestion for improving our project plan. Our original approach involved introducing plasmids to express exogenous proteins, but plasmid expression in yeast tends to be relatively unstable. To facilitate the modeling team's work on predicting expression levels, the professor recommended integrating the expression cassette into the yeast genome, enabling stable and continuous expression of the exogenous protein. We then considered that into our design.

![Professor Xuelin](https://static.igem.wiki/teams/5924/hp/interview/xuelin.webp)

When we talk about our hope to bring our project into implementation and turn it into a botulinum toxin test kit that can be used in households, ^Professor Xuelin^  pointed out that whether the limit of detection(LOD) is lower than the national standard for botulinum toxin is a very important issue.Therefore, we carefully considered this issue and eventually solved it through modeling .

# 3.Food Safety Investigation

In order to understand the food safety awareness and behavior of the general public and prepare for the marketization of our products (will be mentioned in the market research module),we organized a questionnaire survey targeting all age groups and collected 384 valid responses.

^3.1 Basic Information of Respondents^

![basic information of respondents](https://static.igem.wiki/teams/5924/hp/question/awareness-2.webp)

^3.2 Food Safety Awareness and Behavior^

36.8% of respondents often worry about whether food has expired, while less than 10% never worry about food expiration.

Among the respondents, over 60 people (nearly 17%) have experienced food poisoning, and 6 people (1.56%) have experienced botulism poisoning. This indicates that food safety poses a genuine threat to public health and safety. Furthermore, the occurrence of highly dangerous botulism poisoning events is closer than many think.

However, public awareness of botulinum toxin is relatively low; only 35.16% of respondents were familiar with it. In contrast, nitrite, another food safety risk factor, is widely known (nearly 80%). This further highlights the significant importance of our project's focus on promoting awareness and providing education related to botulinum toxin food safety.

![cross-analysis of botulinum toxin awareness and respondent age](https://static.igem.wiki/teams/5924/hp/question/awareness.webp)

Through cross-analysis of botulinum toxin awareness and respondent age, we found that respondents aged 35-44 had the lowest level of awareness, indicating a greater need for food safety education related to botulinum toxin in this group.

^3.3 Conclusion^

Through this food safety questionnaire survey, we utilized a substantial sample size to gain an initial understanding of the issue of insufficient food safety awareness among Chinese citizens. It highlights the barrier between safety awareness and the conversion into safe practices. Additionally, the survey exposed key focuses and blind spots in food safety education. Compared to the relatively high awareness of nitrite, public knowledge about botulinum toxin is extremely limited, creating a dangerous "high-risk, low-awareness" knowledge gap. This necessitates that future education efforts go beyond conventional publicity and focus on eliminating these cognitive blind spots lurking in high-risk behaviors. It further underscores the significant importance of our project's commitment to addressing food safety issues.

# 4.Public Reviews

The project of the USTC iGEM Team is aimed at all groups in the society. To implement the project results and give full attention to social needs, we conducted interviews with Qingsong Food and Guotai Zhongxin Company, and designed a series of questionnaires, which were spoken highly of  by all.

+ ^4.1 Review from the Director of the Laboratory in a Food Processing Enterprise^

    During the cooperation with Qingsong Food, a well-known local food processing enterprise, the USTC iGEM Team presented the project results to the staff. According to Mr. Hong, Director of the Testing Laboratory, the current hidden risks of botulinum toxin mainly exist in home-made foods, such as rice wine and cured meat, which are important parts of Chinese dining culture. In non-industrialized fermentation processes, the invasion of miscellaneous bacteria may lead to safety accidents. Therefore, an efficient and rapid toxin detection kit is urgently needed. So, the USTC iGEM Team was fully recognized for its keen insight into practical needs and the experimental spirit of daring to think and act. At the same time, Mr. Hong also pointed out that the iGEM Team should focus on adapting its products to home application scenarios, and use technological means and design language to make the products easy to use, fully catering to all groups in society (especially children and the elderly).

    ![Visit the Qingsong Food](https://static.igem.wiki/teams/5924/hp/public-reviews/qingsong-food1.webp)

    ![Visit the process of food production](https://static.igem.wiki/teams/5924/hp/public-reviews/qingsong-food2.webp)

+ ^4.2 Review from the Person in Charge of a Third-Party Testing Institution^

    Third-party testing is another potential market for botulinum toxin detection. Guotai Zhongxin Company is mainly responsible for safety testing tasks that food manufacturers cannot conduct on their own, and also engages in legal liability determination and technological innovation. According to Dr. Li, the person in charge, in accordance with relevant national regulations, botulinum toxin detection is mainly carried out in meat factories, but the methods are complex and have high requirements for equipment. Therefore, the trace detection of botulinum toxin is difficult to be widely popularized, resulting in the current situation where the production process is mainly controlled but no detection is conducted. Dr. Li pointed out that detection kits for botulinum toxin will definitely have a huge market and broad application prospects. In the future, the company will carry out more in-depth cooperation with the iGEM Team to promote the application and implementation of new botulinum toxin detection methods . He expressed great expectation for the new achievements and the new products, sincerely suggesting that the team should focus on shortening the detection time and reducing the cost, so that the products can be better used for large-scale and real-time sampling inspection before selling the product.

    ![Visit Guotai Zhongxin](https://static.igem.wiki/teams/5924/hp/public-reviews/guotai-zhongxin.webp)

+ ^4.3 Reviews from Respondents of All Age Groups in Society^

    Finally, the USTC iGEM Team independently designed and distributed a questionnaire on food safety and botulinum toxin. This questionnaire revealed people's high attention to food safety and reflected the lack of effective detection methods in home scenarios. The respondents generally appreciated the practical significance of this questionnaire, as it accurately captured a major pain point in the daily life of the general public—how to safely store and Process food. At the same time, the public also believed that this survey was practical; instead of focusing on macro policies, it concentrated on specific issues that every family may encounter, thus gaining widespread resonance. In addition, the survey also covered many blind spots in the public's knowledge of food safety. This made the respondents realize that improving food safety also requires everyone to enhance their own awareness and capabilities.

# 5.Market Research

To comprehensively investigate the demand and landscape of botulinum toxin detection for public household use, enterprise production, and safety supervision, we conducted a multi-faceted study combining in-depth enterprise interviews (with Qingsong Food, Guotai Zhongxin Testing Institution, and Huangshan Huiweixian Food Co., Ltd.), comprehensive market questionnaire surveys, and active participation in relevant synthetic biology and consumer goods conferences, ultimately achieving significant research outcomes.

+ ^5.1 Fast-Food Enterprise – Qingsong Food^

    In the professional testing laboratory, the USTC iGEM team interviewed the director of the enterprise's quality inspection department and discussed the potential of botulinum toxin detection in commercial applications.


    ^5.1.1 Detection Scenarios: ^

    As a fast-food processing and distribution enterprise, Qingsong Food needs to implement all-rounded safety control over ingredient storage, processing, and distribution in daily operations. Botulinum toxin detection can cover core product lines such as prepared dishes and ready-to-eat meat, especially in circumstances like residual detection after high-temperature sterilization and risk assessment during cold chain transportation.

    ^5.1.2 Specific Demands: ^

    The enterprise focuses more on the "low cost" and "high efficiency" of detection technologies. It hopes that the detection process can be integrated into the existing quality inspection system without large-scale equipment modification. Meanwhile, detection results need to be fed back quickly (within several hours) to adapt to the production pace of the fast food industry. Certainly, the daily monitoring requires a large demand for test kits, and the interviewee also suggested that the USTC iGEM team appropriately reduce the product cost.

    ![](https://static.igem.wiki/teams/5924/hp/market-research/fast-food-enterprise1.webp)

    ![Chat with persons in charge of Food test in Qingsong Food](https://static.igem.wiki/teams/5924/hp/market-research/fast-food-enterprise2.webp)

+ ^ 5.2 Testing Institution – Guotai Zhongxin^

    Guotai Zhongxin is a national-level third-party testing enterprise, mainly responsible for testing during food production and the development of related technologies. We had a discussion with the institution's manager in the conference room regarding botulinum toxin detection.

    ^5.2.1 Market Background: ^

    Currently, the food testing market mainly focuses on pesticide residue detection, heavy metal detection, and conventional microbial detection. There is an obvious gap in special testing services for botulinum toxin – only a few high-end laboratories can carry out such detection, and the detection duration is long, which is difficult to meet the regular testing needs.

    ^5.2.2 Application issues: ^

    The existing botulinum toxin detection technologies have two major problems: "insufficient sensitivity" and "susceptibility to matrix interference". In complex food matrices (such as fast-food products containing oil and protein), false negative results are prone to occur; at the same time, the detection process requires professional personnel to operate precision instruments, making it difficult to achieve on-site detection, which restricts the popularization of this technology.

    ^5.2.3 Prospects: ^

    The enterprise hopes to cooperate fully with the USTC iGEM team to develop detection technologies more suitable for the market background and application needs, to fill the industry's technological gaps, to improve the accuracy of botulinum toxin detection, to reduce food safety risks from the supervision perspective, and to promote the high-quality development of the food industry.

    ![](https://static.igem.wiki/teams/5924/hp/market-research/testing-institution1.webp)

    ![Chat with persons in charge of Guotai Zhongxin](https://static.igem.wiki/teams/5924/hp/market-research/testing-institution2.webp)

+ ^5.3 Fermented Food Enterprise – Huangshan Huiweixian Food Co., Ltd.^

    Huangshan Huiweixian Food Co., Ltd. is a well-known local mandarin fish production enterprise. As a traditional fermented aquatic food, the potential risk of botulinum contamination during the production process is an application scenario that our project focuses on. Through on-site investigations and exchanges with the company's person in charge, we gained a better understanding of the current status and challenges of toxin detection in the field of fermented food, where botulinum pollution occurs most frequently.

    ^5.3.1 Market Background: ^

    Currently, there are standardized methods of management in production, storage, and logistics links, leading to basic food safety control capabilities.However, there is an obvious deficiency in the detection of high-risk and highly toxic substances (such as botulinum toxin). High detection costs and low risk awareness are the main restrictive factors. Consumers face potential food safety risks, and the industry is in urgent need of low-cost and high-efficiency botulinum toxin detection technologies to fill the gap.

    ^5.3.2 Constructive Suggestions: ^

    Firstly, enterprises themselves can introduce new detection tools such as kits developed by the USTC iGEM team to lower the threshold for daily detection; secondly, the government can promote the inclusion of botulinum toxin in the key detection indicators of fermented aquatic products and improve relevant detection standards. The USTC iGEM team should pay attention to product accuracy in the design process to better formulate unified standards, promote the implementation of relevant policies, and enhance the whole society's awareness of food safety.

    ![Chat with the CEO of Huangshan Huiweixian Food Co., Ltd.](https://static.igem.wiki/teams/5924/hp/market-research/fermented-food-enterprise1.webp)

    ![fermented fish](https://static.igem.wiki/teams/5924/hp/market-research/fermented-food-enterprise2.webp)


+ ^5.4 The Conference themed synthetic biology and consumer goods ^

    During the CCIC(Conference of China iGEMer Community) conference, we participated in  self-organizing conference with the theme of synthetic biology and consumer goods, hosted by Mr. Xiaohan Zhang, co-founder of Suzhou Rongbing. As a pioneering entrepreneur who successfully commercialized synthetic biology achievements, Mr. Zhang guided attendees into an in-depth exploration of the core challenges and opportunities in translating synthetic biotechnology into daily products.

    ^5.4.1 In terms of the market^

    our communication with professional seniors and peers had significantly deepened our understanding of where the real needs lay. This helps us more effectively filter out pseudo-demands and translate technological advantages into irreplaceable value for costumers.

    ^5.4.2 In terms of the implementation^

    We learned that systematically planning regulatory research and approval strategies in advance is the lifeline determining whether a product could be a success. This will guide us to adopt a "regulation-first" approach, integrating the quality management system throughout the entire R&D lifecycle and transforming regulatory requirements into solid technical barriers.

    To sum up, this meeting has outlined a clear path for us: using market insights as a compass to guide innovation, and building on the foundation of a rigorous compliance system to ensure safe implementation.

+ ^5.5 Questionnaire Survey^

    We organized a questionnaire survey targeting all age groups and collected 384 valid responses. Questions regarding the demand and pricing for testing kits provided valuable data for our market research.

    ^5.5.1 Strong Demand^

    Over 90% of respondents expressed a desire for a testing kit to detect food spoilage, with more than half expressing strong demand (5/5 rating). Most respondents (over 90%) want the kit to be "portable, reasonably priced, simple to use, and accurate." Nearly 50% of respondents believe one of the main causes of food safety issues is the lack of convenient home testing methods.

    Furthermore, over 35% of respondents make fermented foods at home, which increases the risk of botulism poisoning. This further emphasizes the importance of a portable, easy-to-use, and low-cost botulinum toxin detection kit.

    ^5.5.2 Expected Price^

    ![expected price](https://static.igem.wiki/teams/5924/hp/question/price.webp)

    The majority of respondents find a price range of 10-50 CNY acceptable, while a minority are willing to pay more than 50 CNY.

    ^5.5.3 conclusion^

    This survey offers clear market direction for food safety products. Over half of respondents show strong demand for home testing kits, prioritizing reasonable price, accurate results, and simple use. The acceptable price range for most is 10-50 CNY, providing a solid foundation for product development.

    The core consumer group is urban youth aged 18-24, who demonstrate "high awareness but low practical action" - they value food freshness yet rely heavily on takeout and convenience foods. This paradox reveals a significant market opportunity: providing fast, convenient food safety solutions that fit their lifestyle is key to market success.

    In summary, the research validates substantial market potential while clearly identifying essential product features and the primary target audience for home food safety testing kits.

+ ^5.6 Conclusion^

    This market research investigated the demand and application prospects for botulinum toxin detection through enterprise interviews, questionnaire surveys, and industry conferences.

    The findings reveal a clear and urgent market demand. On the enterprise side, food producers and third-party testing institutions highlighted a critical gap for low-cost, high-efficiency, and easily integrated detection solutions, noting that current technologies suffer from long turnaround times, complex operations, and susceptibility to interference. On the consumer side, the survey showed over 90% of the public desire home-testing kits, prioritizing reasonable price, accurate results, and simple use, with 10-50 CNY being the acceptable price range for most.

    In conclusion, the research validates the significant market potential for botulinum toxin detection products targeting both industrial and household use. The key to success lies in translating technology into cost-effective, user-friendly, and regulatory-compliant solutions that address current market gaps.

    ![the User Requirements Form ](https://static.igem.wiki/teams/5924/hp/market-research/table.webp)

# 6.Communication

# 6.1 CCiC(Conference of China iGEMer Community)

![](https://static.igem.wiki/teams/5924/hp/ccic.webp)

At the 12th Conference of China iGEMer Community (CCiC), we engaged in in-depth exchanges with iGEM teams from universities across the country. During the conference, we presented our project comprehensively and vividly through well-prepared poster displays and PowerPoint roadshows, attracting participants from various schools and projects to exchange ideas. In our discussion with the team from Nankai University, we identified limitations in the detection sensitivity of our project, leading to subsequent revisions and refinements in our approach.

Through the project presentations and discussions, we not only identified areas for improvement in our own delivery but also gained exposure to numerous innovative ideas and cutting-edge technologies. By interacting with like-minded peers who share a passion for synthetic biology, we further enhanced our team's communication and collaboration skills.

# 6.2 Live Biotherapeutic Products Conference in Peking University

![](https://static.igem.wiki/teams/5924/hp/lbpc.webp)

We participated in the live biotherapeutic products, Conference organized by Peking University, a specialized iGEM exchange event that brought together 28 teams from 24 top universities across the country, gathering over a hundred young students. The conference discussed topics such as the targeting and environmental sensing strategies of living medications, as well as their safety issues.

Our project is dedicated to food safety, which is closely linked to human well-being. During the conference, we introduced our research topic and engaged in discussions about the ethical boundaries of synthetic biology. We learned that the starting point of all research should be reverence for life itself and empathy for human struggles. As scientists holding the "Pandora's box," we must respect biological laws, harbor humanistic concern, and, above all, preserve that invaluable creativity in practice.
