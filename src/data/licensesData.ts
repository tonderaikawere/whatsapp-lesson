export interface LicenseDetail {
  id: string;
  name: string;
  spdxId: string;
  category: 'Permissive' | 'Copyleft' | 'Public Domain' | 'Creative Commons';
  summary: string;
  permissions: string[];
  conditions: string[];
  limitations: string[];
  fullText: string;
  guide: string;
}

export const detailedLicenses: LicenseDetail[] = [
  {
    id: 'mit',
    name: 'MIT License',
    spdxId: 'MIT',
    category: 'Permissive',
    summary: 'A short and simple permissive license. It allows anyone to do almost anything with your project, including commercial use, modification, distribution, and sublicense, as long as they retain the original copyright notice and license text.',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Private use', 'Sublicensing'],
    conditions: ['Include copyright notice', 'Include original license notice'],
    limitations: ['Liability limitation', 'Warranty disclaimer'],
    guide: 'The MIT License is the most popular open-source license in the JavaScript, React, and Next.js ecosystems. It is ideal for educational projects, portfolio showcases, and open libraries where maximum adoption and frictionless reuse are desired.',
    fullText: `MIT License

Copyright (c) 2026 Tonderai Kawere (https://tonde-portfolio.vercel.app/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
  },
  {
    id: 'apache-2',
    name: 'Apache License 2.0',
    spdxId: 'Apache-2.0',
    category: 'Permissive',
    summary: 'A permissive license whose main conditions require preservation of copyright and license notices. Contributors provide an express grant of patent rights, and trademark use is explicitly withheld.',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Patent grant', 'Private use', 'Sublicensing'],
    conditions: ['Include copyright notice', 'Include license notice', 'State changes made to files', 'Include NOTICE file if present'],
    limitations: ['No trademark rights', 'Liability limitation', 'Warranty disclaimer'],
    guide: 'Widely used by the Apache Foundation, Google (Android, Chromium), and Kubernetes. Excellent for enterprise-grade open-source where explicit patent indemnification and trademark protections are required.',
    fullText: `Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/

TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

1. Definitions.
"License" shall mean the terms and conditions for use, reproduction, and distribution as defined by Sections 1 through 9 of this document.
"Licensor" shall mean the copyright owner or entity authorized by the copyright owner that is granting the License.
"Legal Entity" shall mean the union of the acting entity and all other entities that control, are controlled by, or are under common control with that entity.

2. Grant of Copyright License.
Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare Derivative Works of, publicly display, publicly perform, sublicense, and distribute the Work and such Derivative Works in Source or Object form.

3. Grant of Patent License.
Each Contributor grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free patent license to make, have made, use, offer to sell, sell, import, and otherwise transfer the Work.

4. Redistribution.
You may reproduce and distribute copies of the Work or Derivative Works thereof in any medium, with or without modifications, provided that You give any other recipients of the Work or Derivative Works a copy of this License; and You must cause any modified files to carry prominent notices stating that You changed the files.`,
  },
  {
    id: 'bsd-3',
    name: 'BSD 3-Clause License',
    spdxId: 'BSD-3-Clause',
    category: 'Permissive',
    summary: 'A permissive license that allows redistribution and use in source and binary forms, with or without modification, provided that copyright notices are retained and names of contributors are not used for endorsement without permission.',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Private use'],
    conditions: ['Include copyright notice', 'Include BSD 3-Clause disclaimer', 'No endorsement clause'],
    limitations: ['Liability limitation', 'Warranty disclaimer'],
    guide: 'Originating from the Berkeley Software Distribution, the BSD 3-Clause license is favored in academic, system-level, and library development (e.g. Go language runtime, NumPy, Go modules).',
    fullText: `BSD 3-Clause License

Copyright (c) 2026, Tonderai Kawere
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.`,
  },
  {
    id: 'gpl-3',
    name: 'GNU General Public License v3.0',
    spdxId: 'GPL-3.0',
    category: 'Copyleft',
    summary: 'The primary strong copyleft license created by the Free Software Foundation. Anyone who distributes derived works must make the complete corresponding source code available under the same license terms.',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Patent grant', 'Private use'],
    conditions: ['Disclose source code', 'License and copyright notice', 'Same license (Copyleft)', 'State changes'],
    limitations: ['Liability limitation', 'Warranty disclaimer'],
    guide: 'Used by Linux kernel utilities, Git, WordPress, and Blender. Guarantees that free software remains free and cannot be locked into closed proprietary products.',
    fullText: `GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007

Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
Everyone is permitted to copy and distribute verbatim copies
of this license document, but changing it is not allowed.

Preamble
The GNU General Public License is a free, copyleft license for
software and other kinds of works.

The licenses for most software and other practical works are designed
to take away your freedom to share and change the works. By contrast,
the GNU General Public License is intended to guarantee your freedom to
share and change all versions of a program--to make sure it remains free
software for all its users. We, the Free Software Foundation, use the
GNU General Public License for most of our software; it applies also to
any other work released this way by its authors. You can apply it to
your programs, too.`,
  },
  {
    id: 'mpl-2',
    name: 'Mozilla Public License 2.0',
    spdxId: 'MPL-2.0',
    category: 'Copyleft',
    summary: 'A weak copyleft license that balances open source and proprietary concerns. Modifications to existing MPL-licensed files must remain open source under MPL, but new proprietary files can be combined to form a larger work.',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Patent grant', 'Private use'],
    conditions: ['Disclose source of MPL files', 'Include license notice'],
    limitations: ['No trademark rights', 'Liability limitation', 'Warranty disclaimer'],
    guide: 'Adopted by Mozilla Firefox and HashiCorp Terraform. Perfect when you want community modifications to existing library files to be shared back, without forcing the entire hosting app to become open source.',
    fullText: `Mozilla Public License Version 2.0
==================================

1. Definitions
1.1. "Contributor" means each individual or legal entity that creates, contributes to the creation of, or owns Covered Software.
1.2. "Covered Software" means Source Code Form to which the initial Contributor has attached the notice in Exhibit A, and Executable Form of such Source Code Form.
1.3. "Larger Work" means a work that combines Covered Software with other code, in a separate file or files, that is not Covered Software.

2. License Grants and Conditions
2.1. Grants. Each Contributor hereby grants You a world-wide, royalty-free, non-exclusive license under intellectual property rights to use, reproduce, make available, modify, display, perform, distribute, and otherwise exploit its Contributions.
2.2. Effective Date. The licenses granted in Section 2.1 with respect to any Contribution become effective for each Contribution on the date the Contributor first distributes such Contribution.`,
  },
  {
    id: 'isc',
    name: 'ISC License',
    spdxId: 'ISC',
    category: 'Permissive',
    summary: 'The ISC license is functionally identical to the Two-Clause BSD and MIT licenses, simplified by removing language that is considered redundant under modern copyright treaties (such as the Berne Convention).',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Private use'],
    conditions: ['Include copyright notice and license notice'],
    limitations: ['Liability limitation', 'Warranty disclaimer'],
    guide: 'Widely chosen by the OpenBSD project and npm packages (e.g. standard npm default license) because of its concise, single-paragraph clarity.',
    fullText: `ISC License

Copyright (c) 2026, Tonderai Kawere

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.`,
  },
  {
    id: 'unlicense',
    name: 'The Unlicense',
    spdxId: 'Unlicense',
    category: 'Public Domain',
    summary: 'A template for dedicating software to the public domain. It completely waives all copyright interests, granting complete freedom to use, modify, publish, sell, or distribute without any conditions whatsoever.',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Private use', 'No attribution required'],
    conditions: ['None (Free public domain dedication)'],
    limitations: ['Liability limitation', 'Warranty disclaimer'],
    guide: 'Used when an author wishes to make their code completely free to the world with zero legal strings attached, ideal for public code snippets and educational algorithms.',
    fullText: `This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.`,
  },
  {
    id: 'epl-2',
    name: 'Eclipse Public License 2.0',
    spdxId: 'EPL-2.0',
    category: 'Copyleft',
    summary: 'A commercially friendly copyleft license created by the Eclipse Foundation. It allows developers to integrate EPL software into proprietary commercial products while requiring that changes to EPL files remain open source.',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Patent grant', 'Private use'],
    conditions: ['Disclose source of EPL files', 'Include license notice'],
    limitations: ['Liability limitation', 'Warranty disclaimer'],
    guide: 'Prevalent in Java, enterprise developer tooling, and IDE plugins (e.g. Eclipse IDE, Clojure ecosystem).',
    fullText: `Eclipse Public License - v 2.0

THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.

1. DEFINITIONS
"Contribution" means:
a) in the case of the initial Contributor, the initial code and documentation distributed under this Agreement, and
b) in the case of each subsequent Contributor:
i) changes to the Program, and
ii) additions to the Program;
where such changes and/or additions to the Program originate from and are distributed by that particular Contributor.

2. GRANT OF RIGHTS
a) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free copyright license to reproduce, prepare Derivative Works of, publicly display, publicly perform, distribute and sublicense the Contribution of such Contributor, if any, and such Derivative Works, in Source Code and other form.`,
  },
  {
    id: 'boost-1',
    name: 'Boost Software License 1.0',
    spdxId: 'BSL-1.0',
    category: 'Permissive',
    summary: 'A simple permissive open-source license crafted specifically for software libraries. Unlike MIT, attribution is only required in source code distributions, not in compiled binary distributions.',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Private use'],
    conditions: ['Include copyright notice and license text in source form only'],
    limitations: ['Liability limitation', 'Warranty disclaimer'],
    guide: 'Created by the Boost C++ Project. It allows programmers to compile header files or static libraries into proprietary games, native mobile apps, and binaries without having to print the license notice in the app store credits.',
    fullText: `Boost Software License - Version 1.0 - August 17th, 2003

Permission is hereby granted, free of charge, to any person or organization
obtaining a copy of the software and accompanying documentation covered by
this license (the "Software") to use, reproduce, display, distribute,
execute, and transmit the Software, and to prepare derivative works of the
Software, and to permit third-parties to whom the Software is furnished to
do so, all subject to the following:

The copyright notices in the Software and this entire statement, including
the above license grant, this restriction and the following disclaimer,
must be included in all copies of the Software, in whole or in part, and
all derivative works of the Software, unless such copies or derivative
works are solely in the form of machine-executable object code generated by
a source language processor.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO EVENT
SHALL THE COPYRIGHT HOLDERS OR ANYONE DISTRIBUTING THE SOFTWARE BE LIABLE
FOR ANY DAMAGES OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.`,
  },
  {
    id: 'cc-by-4',
    name: 'Creative Commons Attribution 4.0 International',
    spdxId: 'CC-BY-4.0',
    category: 'Creative Commons',
    summary: 'A worldwide public copyright license that lets anyone distribute, remix, adapt, and build upon the material in any medium or format, so long as attribution is given to the creator.',
    permissions: ['Share (copy and redistribute)', 'Adapt (remix, transform, and build upon)', 'Commercial use'],
    conditions: ['Attribution required', 'Provide a link to the license', 'Indicate if changes were made'],
    limitations: ['No additional restrictions', 'No warranties'],
    guide: 'The international standard for open documentation, educational courseware, UI icons, datasets, and design assets.',
    fullText: `Creative Commons Attribution 4.0 International Public License

By exercising the Licensed Rights (defined below), You accept and agree to be bound by the terms and conditions of this Creative Commons Attribution 4.0 International Public License ("Public License"). To the extent this Public License may be interpreted as a contract, You are granted the Licensed Rights in consideration of Your acceptance of these terms and conditions, and the Licensor grants You such rights in consideration of benefits the Licensor receives from making the Licensed Material available under these terms and conditions.

Section 1 -- Definitions.
a. Adapted Material means material subject to Copyright and Similar Rights that is derived from or based upon the Licensed Material.
b. Copyright and Similar Rights means copyright and/or similar rights closely related to copyright including, without limitation, performance, broadcast, sound recording, and Sui Generis Database Rights.
c. Licensor means the individual(s) or entity(ies) that offer(s) the Licensed Material under this Public License.

Section 2 -- Scope.
a. License grant.
Subject to the terms and conditions of this Public License, the Licensor hereby grants You a worldwide, royalty-free, non-sublicensable, non-exclusive, irrevocable license to exercise the Licensed Rights in the Licensed Material to reproduce and Share the Licensed Material, in whole or in part; and produce, reproduce, and Share Adapted Material.`,
  },
];
