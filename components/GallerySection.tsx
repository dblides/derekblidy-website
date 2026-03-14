"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

// ─── DATA ────────────────────────────────────────────────────────────────────
// Add photos here. Group them by year. For local photos, place files in
// /public/gallery/ and use src: "/gallery/filename.jpg"
//
// Set photography: true on any shot you consider a real "photography" effort —
// those will appear when the Photography pill is selected.

type Photo = {
  id: number;
  src: string;
  alt: string;
  caption: string;
  photography?: boolean;
};

type YearAlbum = {
  year: number;
  photos: Photo[];
  shuffle?: boolean; // if true, photos are randomised each time the pill is clicked
};

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const albums: YearAlbum[] = [
  {
    year: 2025,
    shuffle: true,
    photos: [
      { id: 700, src: "/gallery/2025/202512131756528129.JPG", alt: "2025", caption: "2025" },
      { id: 701, src: "/gallery/2025/FullSizeRender 2.jpeg",      alt: "2025", caption: "2025" },
      { id: 702, src: "/gallery/2025/FullSizeRender.JPEG",        alt: "2025", caption: "2025" },
      { id: 703, src: "/gallery/2025/IMG_0006.JPG",               alt: "2025", caption: "2025" },
      { id: 704, src: "/gallery/2025/IMG_0047.JPG",               alt: "2025", caption: "2025" },
      { id: 705, src: "/gallery/2025/IMG_0668.JPEG",              alt: "2025", caption: "2025" },
      { id: 706, src: "/gallery/2025/IMG_0986.jpeg",              alt: "2025", caption: "2025" },
      { id: 707, src: "/gallery/2025/IMG_1004.jpeg",              alt: "2025", caption: "2025" },
      { id: 708, src: "/gallery/2025/IMG_1301.jpeg",              alt: "2025", caption: "2025" },
      { id: 709, src: "/gallery/2025/IMG_1324.jpeg",              alt: "2025", caption: "2025" },
      { id: 710, src: "/gallery/2025/IMG_1388.jpeg",              alt: "2025", caption: "2025" },
      { id: 711, src: "/gallery/2025/IMG_1464.jpeg",              alt: "2025", caption: "2025" },
      { id: 712, src: "/gallery/2025/IMG_1513.jpeg",              alt: "2025", caption: "2025" },
      { id: 713, src: "/gallery/2025/IMG_1706.jpeg",              alt: "2025", caption: "2025" },
      { id: 714, src: "/gallery/2025/IMG_1774.jpeg",              alt: "2025", caption: "2025" },
      { id: 715, src: "/gallery/2025/IMG_1958.jpeg",              alt: "2025", caption: "2025" },
      { id: 716, src: "/gallery/2025/IMG_1966.jpeg",              alt: "2025", caption: "2025" },
      { id: 717, src: "/gallery/2025/IMG_2050.jpeg",              alt: "2025", caption: "2025" },
      { id: 718, src: "/gallery/2025/IMG_2137.jpeg",              alt: "2025", caption: "2025" },
      { id: 719, src: "/gallery/2025/IMG_2321.jpeg",              alt: "2025", caption: "2025" },
      { id: 720, src: "/gallery/2025/IMG_2331.jpeg",              alt: "2025", caption: "2025" },
      { id: 721, src: "/gallery/2025/IMG_2443.jpeg",              alt: "2025", caption: "2025" },
      { id: 722, src: "/gallery/2025/IMG_2729.jpeg",              alt: "2025", caption: "2025" },
      { id: 723, src: "/gallery/2025/IMG_3128.jpeg",              alt: "2025", caption: "2025" },
      { id: 724, src: "/gallery/2025/IMG_3141.jpeg",              alt: "2025", caption: "2025" },
      { id: 725, src: "/gallery/2025/IMG_3359.jpeg",              alt: "2025", caption: "2025" },
      { id: 726, src: "/gallery/2025/IMG_3565.jpeg",              alt: "2025", caption: "2025" },
      { id: 727, src: "/gallery/2025/IMG_3628.jpeg",              alt: "2025", caption: "2025" },
      { id: 728, src: "/gallery/2025/IMG_3673.jpeg",              alt: "2025", caption: "2025" },
      { id: 729, src: "/gallery/2025/IMG_3831.jpeg",              alt: "2025", caption: "2025" },
      { id: 730, src: "/gallery/2025/IMG_3887.jpeg",              alt: "2025", caption: "2025" },
      { id: 731, src: "/gallery/2025/IMG_3895.jpeg",              alt: "2025", caption: "2025" },
      { id: 732, src: "/gallery/2025/IMG_4036.JPEG",              alt: "2025", caption: "2025" },
      { id: 733, src: "/gallery/2025/IMG_4151.jpeg",              alt: "2025", caption: "2025" },
      { id: 734, src: "/gallery/2025/IMG_4241.jpeg",              alt: "2025", caption: "2025" },
      { id: 735, src: "/gallery/2025/IMG_4249.jpeg",              alt: "2025", caption: "2025" },
      { id: 736, src: "/gallery/2025/IMG_4458.jpeg",              alt: "2025", caption: "2025" },
      { id: 737, src: "/gallery/2025/IMG_4587.jpeg",              alt: "2025", caption: "2025" },
      { id: 738, src: "/gallery/2025/IMG_4680.jpeg",              alt: "2025", caption: "2025" },
      { id: 739, src: "/gallery/2025/IMG_4715.jpeg",              alt: "2025", caption: "2025" },
      { id: 740, src: "/gallery/2025/IMG_4887.jpeg",              alt: "2025", caption: "2025" },
      { id: 741, src: "/gallery/2025/IMG_4924.jpeg",              alt: "2025", caption: "2025" },
      { id: 742, src: "/gallery/2025/IMG_4926.jpeg",              alt: "2025", caption: "2025" },
      { id: 743, src: "/gallery/2025/IMG_4980.jpeg",              alt: "2025", caption: "2025" },
      { id: 744, src: "/gallery/2025/IMG_5007.jpeg",              alt: "2025", caption: "2025" },
      { id: 745, src: "/gallery/2025/IMG_5009.jpeg",              alt: "2025", caption: "2025" },
      { id: 746, src: "/gallery/2025/IMG_5047.jpeg",              alt: "2025", caption: "2025" },
      { id: 747, src: "/gallery/2025/IMG_5105.jpeg",              alt: "2025", caption: "2025" },
      { id: 748, src: "/gallery/2025/IMG_5164.jpeg",              alt: "2025", caption: "2025" },
      { id: 749, src: "/gallery/2025/IMG_5170.jpeg",              alt: "2025", caption: "2025" },
      { id: 750, src: "/gallery/2025/IMG_5237.jpeg",              alt: "2025", caption: "2025" },
      { id: 751, src: "/gallery/2025/IMG_5251.jpeg",              alt: "2025", caption: "2025" },
      { id: 752, src: "/gallery/2025/IMG_5299.jpeg",              alt: "2025", caption: "2025" },
      { id: 753, src: "/gallery/2025/IMG_5328.jpeg",              alt: "2025", caption: "2025" },
      { id: 754, src: "/gallery/2025/IMG_5361.jpeg",              alt: "2025", caption: "2025" },
      { id: 755, src: "/gallery/2025/IMG_5371.jpeg",              alt: "2025", caption: "2025" },
      { id: 756, src: "/gallery/2025/IMG_5384.jpeg",              alt: "2025", caption: "2025" },
      { id: 757, src: "/gallery/2025/IMG_5488.jpeg",              alt: "2025", caption: "2025" },
      { id: 758, src: "/gallery/2025/IMG_5528.jpeg",              alt: "2025", caption: "2025" },
      { id: 759, src: "/gallery/2025/IMG_5532.jpeg",              alt: "2025", caption: "2025" },
      { id: 760, src: "/gallery/2025/IMG_5564.jpeg",              alt: "2025", caption: "2025" },
      { id: 761, src: "/gallery/2025/IMG_5686.jpeg",              alt: "2025", caption: "2025" },
      { id: 762, src: "/gallery/2025/IMG_5691.jpeg",              alt: "2025", caption: "2025" },
      { id: 763, src: "/gallery/2025/IMG_5692.jpeg",              alt: "2025", caption: "2025" },
      { id: 764, src: "/gallery/2025/IMG_5726.jpeg",              alt: "2025", caption: "2025" },
      { id: 765, src: "/gallery/2025/IMG_5760.jpeg",              alt: "2025", caption: "2025" },
      { id: 766, src: "/gallery/2025/IMG_5768.jpeg",              alt: "2025", caption: "2025" },
      { id: 767, src: "/gallery/2025/IMG_5844.jpeg",              alt: "2025", caption: "2025" },
      { id: 768, src: "/gallery/2025/IMG_5939.jpeg",              alt: "2025", caption: "2025" },
      { id: 769, src: "/gallery/2025/IMG_5942.jpeg",              alt: "2025", caption: "2025" },
      { id: 770, src: "/gallery/2025/IMG_5989.jpeg",              alt: "2025", caption: "2025" },
      { id: 771, src: "/gallery/2025/IMG_6068.jpeg",              alt: "2025", caption: "2025" },
      { id: 772, src: "/gallery/2025/IMG_6069.jpeg",              alt: "2025", caption: "2025" },
      { id: 773, src: "/gallery/2025/IMG_6080.jpeg",              alt: "2025", caption: "2025" },
      { id: 774, src: "/gallery/2025/IMG_6089.jpeg",              alt: "2025", caption: "2025" },
      { id: 775, src: "/gallery/2025/IMG_6093.jpeg",              alt: "2025", caption: "2025" },
      { id: 776, src: "/gallery/2025/IMG_6101.jpeg",              alt: "2025", caption: "2025" },
      { id: 777, src: "/gallery/2025/IMG_6112.jpeg",              alt: "2025", caption: "2025" },
      { id: 778, src: "/gallery/2025/IMG_6153.jpeg",              alt: "2025", caption: "2025" },
      { id: 779, src: "/gallery/2025/IMG_6158.jpeg",              alt: "2025", caption: "2025" },
      { id: 780, src: "/gallery/2025/IMG_6164.jpeg",              alt: "2025", caption: "2025" },
      { id: 781, src: "/gallery/2025/IMG_6476.jpeg",              alt: "2025", caption: "2025" },
      { id: 782, src: "/gallery/2025/IMG_7108.jpeg",              alt: "2025", caption: "2025" },
      { id: 783, src: "/gallery/2025/IMG_7331.JPEG",              alt: "2025", caption: "2025" },
      { id: 784, src: "/gallery/2025/IMG_8098.JPEG",              alt: "2025", caption: "2025" },
      { id: 785, src: "/gallery/2025/IMG_9457.jpeg",              alt: "2025", caption: "2025" },
      { id: 786, src: "/gallery/2025/IMG_9772.JPEG",              alt: "2025", caption: "2025" },
      { id: 787, src: "/gallery/2025/f0f7d4c0-2b27-49fc-a05f-3955f9e7580c.JPG", alt: "2025", caption: "2025" },
    ],
  },
  {
    year: 2024,
    shuffle: true,
    photos: [
      { id: 500, src: "/gallery/2024/2024-07-04-13-46-13-382.jpeg",              alt: "2024", caption: "2024" },
      { id: 501, src: "/gallery/2024/F12EE676-80BF-4DEB-B153-71DF70FAF92B.jpeg", alt: "2024", caption: "2024" },
      { id: 502, src: "/gallery/2024/FullSizeRender.JPEG",  alt: "2024", caption: "2024" },
      { id: 503, src: "/gallery/2024/IMG_0005.jpeg",        alt: "2024", caption: "2024" },
      { id: 504, src: "/gallery/2024/IMG_0141.jpeg",        alt: "2024", caption: "2024" },
      { id: 505, src: "/gallery/2024/IMG_0231.jpeg",        alt: "2024", caption: "2024" },
      { id: 506, src: "/gallery/2024/IMG_0282.jpeg",        alt: "2024", caption: "2024" },
      { id: 507, src: "/gallery/2024/IMG_0295.jpeg",        alt: "2024", caption: "2024" },
      { id: 508, src: "/gallery/2024/IMG_0400.jpeg",        alt: "2024", caption: "2024" },
      { id: 509, src: "/gallery/2024/IMG_0407.jpeg",        alt: "2024", caption: "2024" },
      { id: 510, src: "/gallery/2024/IMG_0423.jpeg",        alt: "2024", caption: "2024" },
      { id: 511, src: "/gallery/2024/IMG_0440.jpeg",        alt: "2024", caption: "2024" },
      { id: 512, src: "/gallery/2024/IMG_0456.jpeg",        alt: "2024", caption: "2024" },
      { id: 513, src: "/gallery/2024/IMG_0509.jpeg",        alt: "2024", caption: "2024" },
      { id: 514, src: "/gallery/2024/IMG_0511.jpeg",        alt: "2024", caption: "2024" },
      { id: 515, src: "/gallery/2024/IMG_0517.jpeg",        alt: "2024", caption: "2024" },
      { id: 516, src: "/gallery/2024/IMG_0524.jpeg",        alt: "2024", caption: "2024" },
      { id: 517, src: "/gallery/2024/IMG_0641.jpeg",        alt: "2024", caption: "2024" },
      { id: 518, src: "/gallery/2024/IMG_0668.jpeg",        alt: "2024", caption: "2024" },
      { id: 519, src: "/gallery/2024/IMG_0714.jpeg",        alt: "2024", caption: "2024" },
      { id: 520, src: "/gallery/2024/IMG_0716.JPEG",        alt: "2024", caption: "2024" },
      { id: 521, src: "/gallery/2024/IMG_0727.jpeg",        alt: "2024", caption: "2024" },
      { id: 522, src: "/gallery/2024/IMG_0853.jpeg",        alt: "2024", caption: "2024" },
      { id: 523, src: "/gallery/2024/IMG_0878.jpeg",        alt: "2024", caption: "2024" },
      { id: 524, src: "/gallery/2024/IMG_0895.jpeg",        alt: "2024", caption: "2024" },
      { id: 525, src: "/gallery/2024/IMG_0907.jpeg",        alt: "2024", caption: "2024" },
      { id: 526, src: "/gallery/2024/IMG_0987.jpeg",        alt: "2024", caption: "2024" },
      { id: 527, src: "/gallery/2024/IMG_1584.JPG",         alt: "2024", caption: "2024" },
      { id: 528, src: "/gallery/2024/IMG_2499.jpeg",        alt: "2024", caption: "2024" },
      { id: 529, src: "/gallery/2024/IMG_2676.JPEG",        alt: "2024", caption: "2024" },
      { id: 530, src: "/gallery/2024/IMG_2682.JPEG",        alt: "2024", caption: "2024" },
      { id: 531, src: "/gallery/2024/IMG_3557.jpeg",        alt: "2024", caption: "2024" },
      { id: 532, src: "/gallery/2024/IMG_3579.jpeg",        alt: "2024", caption: "2024" },
      { id: 533, src: "/gallery/2024/IMG_3843.jpeg",        alt: "2024", caption: "2024" },
      { id: 534, src: "/gallery/2024/IMG_4138.jpeg",        alt: "2024", caption: "2024" },
      { id: 535, src: "/gallery/2024/IMG_4822.jpeg",        alt: "2024", caption: "2024" },
      { id: 536, src: "/gallery/2024/IMG_4830.jpeg",        alt: "2024", caption: "2024" },
      { id: 537, src: "/gallery/2024/IMG_4969.heic.jpeg",   alt: "2024", caption: "2024" },
      { id: 538, src: "/gallery/2024/IMG_5051.JPG",         alt: "2024", caption: "2024" },
      { id: 539, src: "/gallery/2024/IMG_5065.JPG",         alt: "2024", caption: "2024" },
      { id: 540, src: "/gallery/2024/IMG_5071.JPG",         alt: "2024", caption: "2024" },
      { id: 541, src: "/gallery/2024/IMG_5077.jpeg",        alt: "2024", caption: "2024" },
      { id: 542, src: "/gallery/2024/IMG_5112.JPG",         alt: "2024", caption: "2024" },
      { id: 543, src: "/gallery/2024/IMG_5154.JPG",         alt: "2024", caption: "2024" },
      { id: 544, src: "/gallery/2024/IMG_6275.JPG",         alt: "2024", caption: "2024" },
      { id: 545, src: "/gallery/2024/IMG_6438.jpeg",        alt: "2024", caption: "2024" },
      { id: 546, src: "/gallery/2024/IMG_6442.jpeg",        alt: "2024", caption: "2024" },
      { id: 547, src: "/gallery/2024/IMG_6703.jpeg",        alt: "2024", caption: "2024" },
      { id: 548, src: "/gallery/2024/IMG_6758.jpeg",        alt: "2024", caption: "2024" },
      { id: 549, src: "/gallery/2024/IMG_6944.HEIC.JPEG",   alt: "2024", caption: "2024" },
      { id: 550, src: "/gallery/2024/IMG_7821.jpeg",        alt: "2024", caption: "2024" },
      { id: 551, src: "/gallery/2024/IMG_8205.jpeg",        alt: "2024", caption: "2024" },
      { id: 552, src: "/gallery/2024/IMG_8373.jpeg",        alt: "2024", caption: "2024" },
      { id: 553, src: "/gallery/2024/IMG_8456.jpeg",        alt: "2024", caption: "2024" },
      { id: 554, src: "/gallery/2024/IMG_8731.jpeg",        alt: "2024", caption: "2024" },
      { id: 555, src: "/gallery/2024/IMG_8796.jpeg",        alt: "2024", caption: "2024" },
      { id: 556, src: "/gallery/2024/IMG_8807.jpeg",        alt: "2024", caption: "2024" },
      { id: 557, src: "/gallery/2024/IMG_8855.jpeg",        alt: "2024", caption: "2024" },
      { id: 558, src: "/gallery/2024/IMG_8934.jpeg",        alt: "2024", caption: "2024" },
      { id: 559, src: "/gallery/2024/IMG_9034.jpeg",        alt: "2024", caption: "2024" },
      { id: 560, src: "/gallery/2024/IMG_9057.jpeg",        alt: "2024", caption: "2024" },
      { id: 561, src: "/gallery/2024/IMG_9107.jpeg",        alt: "2024", caption: "2024" },
      { id: 562, src: "/gallery/2024/IMG_9163.jpeg",        alt: "2024", caption: "2024" },
      { id: 563, src: "/gallery/2024/IMG_9392.jpeg",        alt: "2024", caption: "2024" },
      { id: 564, src: "/gallery/2024/IMG_9463.jpeg",        alt: "2024", caption: "2024" },
      { id: 565, src: "/gallery/2024/IMG_9467.jpeg",        alt: "2024", caption: "2024" },
      { id: 566, src: "/gallery/2024/IMG_9513.jpeg",        alt: "2024", caption: "2024" },
      { id: 567, src: "/gallery/2024/IMG_9528.jpeg",        alt: "2024", caption: "2024" },
      { id: 568, src: "/gallery/2024/IMG_9545.jpeg",        alt: "2024", caption: "2024" },
      { id: 569, src: "/gallery/2024/IMG_9657.jpeg",        alt: "2024", caption: "2024" },
      { id: 570, src: "/gallery/2024/IMG_9712.jpeg",        alt: "2024", caption: "2024" },
      { id: 571, src: "/gallery/2024/IMG_9871.jpeg",        alt: "2024", caption: "2024" },
      { id: 572, src: "/gallery/2024/IMG_9913.jpeg",        alt: "2024", caption: "2024" },
      { id: 573, src: "/gallery/2024/IMG_9923.jpeg",        alt: "2024", caption: "2024" },
      { id: 574, src: "/gallery/2024/IMG_9964.jpeg",        alt: "2024", caption: "2024" },
    ],
  },
  {
    year: 2023,
    shuffle: true,
    photos: [
      { id: 300, src: "/gallery/2023/69525673024__A3319FA1-BC2B-4D78-94CB-2A23B8A22699.jpeg", alt: "2023", caption: "2023" },
      { id: 301, src: "/gallery/2023/71132488122__36965484-2935-4B37-9F1A-E02BA32BE7E8.jpeg", alt: "2023", caption: "2023" },
      { id: 302, src: "/gallery/2023/71486992205__33180520-092B-4261-A3A4-E8890E33376E.jpeg", alt: "2023", caption: "2023" },
      { id: 303, src: "/gallery/2023/71529723306__DED2E7FB-E911-4315-A249-A54A54F2147C.jpeg", alt: "2023", caption: "2023" },
      { id: 304, src: "/gallery/2023/72522082544__73754A9B-A723-4A23-AD0D-DAE821A629EF.jpeg", alt: "2023", caption: "2023" },
      { id: 305, src: "/gallery/2023/F7CC7717-BCC5-4CB1-A4C3-E8781EF3B201.JPEG",              alt: "2023", caption: "2023" },
      { id: 306, src: "/gallery/2023/FullSizeR.jpg",      alt: "2023", caption: "2023" },
      { id: 307, src: "/gallery/2023/IMG_0013.JPG",       alt: "2023", caption: "2023" },
      { id: 308, src: "/gallery/2023/IMG_0054.JPG",       alt: "2023", caption: "2023" },
      { id: 309, src: "/gallery/2023/IMG_0059.JPG",       alt: "2023", caption: "2023" },
      { id: 310, src: "/gallery/2023/IMG_0078.JPG",       alt: "2023", caption: "2023" },
      { id: 311, src: "/gallery/2023/IMG_0086.JPG",       alt: "2023", caption: "2023" },
      { id: 312, src: "/gallery/2023/IMG_0089.JPG",       alt: "2023", caption: "2023" },
      { id: 313, src: "/gallery/2023/IMG_0092.JPG",       alt: "2023", caption: "2023" },
      { id: 314, src: "/gallery/2023/IMG_0099.JPG",       alt: "2023", caption: "2023" },
      { id: 315, src: "/gallery/2023/IMG_0114.JPG",       alt: "2023", caption: "2023" },
      { id: 316, src: "/gallery/2023/IMG_0136.JPG",       alt: "2023", caption: "2023" },
      { id: 317, src: "/gallery/2023/IMG_0143.JPG",       alt: "2023", caption: "2023" },
      { id: 318, src: "/gallery/2023/IMG_0153.JPG",       alt: "2023", caption: "2023" },
      { id: 319, src: "/gallery/2023/IMG_0163.JPG",       alt: "2023", caption: "2023" },
      { id: 320, src: "/gallery/2023/IMG_0366.jpeg",      alt: "2023", caption: "2023" },
      { id: 321, src: "/gallery/2023/IMG_1176.jpeg",      alt: "2023", caption: "2023" },
      { id: 322, src: "/gallery/2023/IMG_1182.jpeg",      alt: "2023", caption: "2023" },
      { id: 323, src: "/gallery/2023/IMG_1203.jpeg",      alt: "2023", caption: "2023" },
      { id: 324, src: "/gallery/2023/IMG_1292.jpeg",      alt: "2023", caption: "2023" },
      { id: 325, src: "/gallery/2023/IMG_1545.jpeg",      alt: "2023", caption: "2023" },
      { id: 326, src: "/gallery/2023/IMG_1613.jpeg",      alt: "2023", caption: "2023" },
      { id: 327, src: "/gallery/2023/IMG_3101.jpeg",      alt: "2023", caption: "2023" },
      { id: 328, src: "/gallery/2023/IMG_3527.jpeg",      alt: "2023", caption: "2023" },
      { id: 329, src: "/gallery/2023/IMG_3581.jpg",       alt: "2023", caption: "2023" },
      { id: 330, src: "/gallery/2023/IMG_3596.jpeg",      alt: "2023", caption: "2023" },
      { id: 331, src: "/gallery/2023/IMG_3991.jpeg",      alt: "2023", caption: "2023" },
      { id: 332, src: "/gallery/2023/IMG_4457.jpeg",      alt: "2023", caption: "2023" },
      { id: 333, src: "/gallery/2023/IMG_5418.jpeg",      alt: "2023", caption: "2023" },
      { id: 334, src: "/gallery/2023/IMG_5434 2.jpeg",    alt: "2023", caption: "2023" },
      { id: 335, src: "/gallery/2023/IMG_5434.jpeg",      alt: "2023", caption: "2023" },
      { id: 336, src: "/gallery/2023/IMG_5665.jpeg",      alt: "2023", caption: "2023" },
      { id: 337, src: "/gallery/2023/IMG_5709.jpeg",      alt: "2023", caption: "2023" },
      { id: 338, src: "/gallery/2023/IMG_5715.jpeg",      alt: "2023", caption: "2023" },
      { id: 339, src: "/gallery/2023/IMG_5720.jpeg",      alt: "2023", caption: "2023" },
      { id: 340, src: "/gallery/2023/IMG_5721.jpeg",      alt: "2023", caption: "2023" },
      { id: 341, src: "/gallery/2023/IMG_5730.jpeg",      alt: "2023", caption: "2023" },
      { id: 342, src: "/gallery/2023/IMG_5732.jpeg",      alt: "2023", caption: "2023" },
      { id: 343, src: "/gallery/2023/IMG_5739.jpeg",      alt: "2023", caption: "2023" },
      { id: 344, src: "/gallery/2023/IMG_5743.jpeg",      alt: "2023", caption: "2023" },
      { id: 345, src: "/gallery/2023/IMG_5753.jpeg",      alt: "2023", caption: "2023" },
      { id: 346, src: "/gallery/2023/IMG_5761.jpeg",      alt: "2023", caption: "2023" },
      { id: 347, src: "/gallery/2023/IMG_5776.jpeg",      alt: "2023", caption: "2023" },
      { id: 348, src: "/gallery/2023/IMG_5788.jpeg",      alt: "2023", caption: "2023" },
      { id: 349, src: "/gallery/2023/IMG_5793.jpeg",      alt: "2023", caption: "2023" },
      { id: 350, src: "/gallery/2023/IMG_5796.jpeg",      alt: "2023", caption: "2023" },
      { id: 351, src: "/gallery/2023/IMG_5797.jpeg",      alt: "2023", caption: "2023" },
      { id: 352, src: "/gallery/2023/IMG_5801.jpeg",      alt: "2023", caption: "2023" },
      { id: 353, src: "/gallery/2023/IMG_5807.jpeg",      alt: "2023", caption: "2023" },
      { id: 354, src: "/gallery/2023/IMG_5812.jpeg",      alt: "2023", caption: "2023" },
      { id: 355, src: "/gallery/2023/IMG_5829.jpeg",      alt: "2023", caption: "2023" },
      { id: 356, src: "/gallery/2023/IMG_5844.jpeg",      alt: "2023", caption: "2023" },
      { id: 357, src: "/gallery/2023/IMG_5845.jpeg",      alt: "2023", caption: "2023" },
      { id: 358, src: "/gallery/2023/IMG_5847.jpeg",      alt: "2023", caption: "2023" },
      { id: 359, src: "/gallery/2023/IMG_5855.jpeg",      alt: "2023", caption: "2023" },
      { id: 360, src: "/gallery/2023/IMG_5858.jpeg",      alt: "2023", caption: "2023" },
      { id: 361, src: "/gallery/2023/IMG_5872.jpeg",      alt: "2023", caption: "2023" },
      { id: 362, src: "/gallery/2023/IMG_5882.jpeg",      alt: "2023", caption: "2023" },
      { id: 363, src: "/gallery/2023/IMG_5888.jpeg",      alt: "2023", caption: "2023" },
      { id: 364, src: "/gallery/2023/IMG_5899.jpeg",      alt: "2023", caption: "2023" },
      { id: 365, src: "/gallery/2023/IMG_5913.jpeg",      alt: "2023", caption: "2023" },
      { id: 366, src: "/gallery/2023/IMG_5921.jpeg",      alt: "2023", caption: "2023" },
      { id: 367, src: "/gallery/2023/IMG_5923.jpeg",      alt: "2023", caption: "2023" },
      { id: 368, src: "/gallery/2023/IMG_5947.jpeg",      alt: "2023", caption: "2023" },
      { id: 369, src: "/gallery/2023/IMG_5949.jpeg",      alt: "2023", caption: "2023" },
      { id: 370, src: "/gallery/2023/IMG_5999.jpeg",      alt: "2023", caption: "2023" },
      { id: 371, src: "/gallery/2023/IMG_6020.jpeg",      alt: "2023", caption: "2023" },
      { id: 372, src: "/gallery/2023/IMG_6037.jpeg",      alt: "2023", caption: "2023" },
      { id: 373, src: "/gallery/2023/IMG_6080.jpeg",      alt: "2023", caption: "2023" },
      { id: 374, src: "/gallery/2023/IMG_6085.jpeg",      alt: "2023", caption: "2023" },
      { id: 375, src: "/gallery/2023/IMG_6086.jpeg",      alt: "2023", caption: "2023" },
      { id: 376, src: "/gallery/2023/IMG_6181.jpg",       alt: "2023", caption: "2023" },
      { id: 377, src: "/gallery/2023/IMG_6188.jpeg",      alt: "2023", caption: "2023" },
      { id: 378, src: "/gallery/2023/IMG_6211.jpg",       alt: "2023", caption: "2023" },
      { id: 379, src: "/gallery/2023/IMG_6274.jpeg",      alt: "2023", caption: "2023" },
      { id: 380, src: "/gallery/2023/IMG_6277.jpeg",      alt: "2023", caption: "2023" },
      { id: 381, src: "/gallery/2023/IMG_6453.JPG",       alt: "2023", caption: "2023" },
      { id: 382, src: "/gallery/2023/IMG_6495.jpeg",      alt: "2023", caption: "2023" },
      { id: 383, src: "/gallery/2023/IMG_6496.jpeg",      alt: "2023", caption: "2023" },
      { id: 384, src: "/gallery/2023/IMG_6643.jpeg",      alt: "2023", caption: "2023" },
      { id: 385, src: "/gallery/2023/IMG_6677.jpeg",      alt: "2023", caption: "2023" },
      { id: 386, src: "/gallery/2023/IMG_6698.jpeg",      alt: "2023", caption: "2023" },
      { id: 387, src: "/gallery/2023/IMG_6726.jpeg",      alt: "2023", caption: "2023" },
      { id: 388, src: "/gallery/2023/IMG_6730.jpeg",      alt: "2023", caption: "2023" },
      { id: 389, src: "/gallery/2023/IMG_6735.jpeg",      alt: "2023", caption: "2023" },
      { id: 390, src: "/gallery/2023/IMG_6738.jpeg",      alt: "2023", caption: "2023" },
      { id: 391, src: "/gallery/2023/IMG_6745.jpeg",      alt: "2023", caption: "2023" },
      { id: 392, src: "/gallery/2023/IMG_6762.JPG",       alt: "2023", caption: "2023" },
      { id: 393, src: "/gallery/2023/IMG_6764.jpeg",      alt: "2023", caption: "2023" },
      { id: 394, src: "/gallery/2023/IMG_6971.jpeg",      alt: "2023", caption: "2023" },
      { id: 395, src: "/gallery/2023/IMG_6990.jpeg",      alt: "2023", caption: "2023" },
      { id: 396, src: "/gallery/2023/IMG_7017.jpeg",      alt: "2023", caption: "2023" },
      { id: 397, src: "/gallery/2023/IMG_7076.jpeg",      alt: "2023", caption: "2023" },
      { id: 398, src: "/gallery/2023/IMG_7077.jpeg",      alt: "2023", caption: "2023" },
      { id: 399, src: "/gallery/2023/IMG_7120.jpeg",      alt: "2023", caption: "2023" },
      { id: 400, src: "/gallery/2023/IMG_7165.jpeg",      alt: "2023", caption: "2023" },
      { id: 401, src: "/gallery/2023/IMG_7167.jpeg",      alt: "2023", caption: "2023" },
      { id: 402, src: "/gallery/2023/IMG_7173.jpeg",      alt: "2023", caption: "2023" },
      { id: 403, src: "/gallery/2023/IMG_7252.jpeg",      alt: "2023", caption: "2023" },
      { id: 404, src: "/gallery/2023/IMG_7290.jpeg",      alt: "2023", caption: "2023" },
      { id: 405, src: "/gallery/2023/IMG_7298.jpeg",      alt: "2023", caption: "2023" },
      { id: 406, src: "/gallery/2023/IMG_7314.jpeg",      alt: "2023", caption: "2023" },
      { id: 407, src: "/gallery/2023/IMG_7346.jpeg",      alt: "2023", caption: "2023" },
      { id: 408, src: "/gallery/2023/IMG_7356.jpeg",      alt: "2023", caption: "2023" },
      { id: 409, src: "/gallery/2023/IMG_7362.jpeg",      alt: "2023", caption: "2023" },
      { id: 410, src: "/gallery/2023/IMG_9135.jpeg",      alt: "2023", caption: "2023" },
      { id: 411, src: "/gallery/2023/IMG_9414.jpeg",      alt: "2023", caption: "2023" },
    ],
  },
  {
    year: 2022,
    shuffle: true,
    photos: [
      { id: 200, src: "/gallery/2022/68821927338__C6E9FC0B-49BD-40C9-884C-0B762C717351.jpeg", alt: "2022", caption: "2022" },
      { id: 201, src: "/gallery/2022/69152473100__7700DC65-F89F-4692-8A01-C02399270909.jpeg", alt: "2022", caption: "2022" },
      { id: 202, src: "/gallery/2022/FullSizeRender.jpeg",  alt: "2022", caption: "2022" },
      { id: 203, src: "/gallery/2022/IMG_0003.JPG",         alt: "2022", caption: "2022" },
      { id: 204, src: "/gallery/2022/IMG_0055.jpeg",        alt: "2022", caption: "2022" },
      { id: 205, src: "/gallery/2022/IMG_0125.JPG",         alt: "2022", caption: "2022" },
      { id: 206, src: "/gallery/2022/IMG_0154.JPG",         alt: "2022", caption: "2022" },
      { id: 207, src: "/gallery/2022/IMG_0195.JPG",         alt: "2022", caption: "2022" },
      { id: 208, src: "/gallery/2022/IMG_0244.JPG",         alt: "2022", caption: "2022" },
      { id: 209, src: "/gallery/2022/IMG_0466.jpeg",        alt: "2022", caption: "2022" },
      { id: 210, src: "/gallery/2022/IMG_0538.jpeg",        alt: "2022", caption: "2022" },
      { id: 211, src: "/gallery/2022/IMG_0582.jpeg",        alt: "2022", caption: "2022" },
      { id: 212, src: "/gallery/2022/IMG_0697.jpeg",        alt: "2022", caption: "2022" },
      { id: 213, src: "/gallery/2022/IMG_1157.jpeg",        alt: "2022", caption: "2022" },
      { id: 214, src: "/gallery/2022/IMG_2487.jpeg",        alt: "2022", caption: "2022" },
      { id: 215, src: "/gallery/2022/IMG_2753.jpeg",        alt: "2022", caption: "2022" },
      { id: 216, src: "/gallery/2022/IMG_2821.jpeg",        alt: "2022", caption: "2022" },
      { id: 217, src: "/gallery/2022/IMG_2823.jpeg",        alt: "2022", caption: "2022" },
      { id: 218, src: "/gallery/2022/IMG_3338.jpeg",        alt: "2022", caption: "2022" },
      { id: 219, src: "/gallery/2022/IMG_3343.jpeg",        alt: "2022", caption: "2022" },
      { id: 220, src: "/gallery/2022/IMG_3344.jpeg",        alt: "2022", caption: "2022" },
      { id: 221, src: "/gallery/2022/IMG_3940.jpeg",        alt: "2022", caption: "2022" },
      { id: 222, src: "/gallery/2022/IMG_4034.jpeg",        alt: "2022", caption: "2022" },
      { id: 223, src: "/gallery/2022/IMG_4094.jpeg",        alt: "2022", caption: "2022" },
      { id: 224, src: "/gallery/2022/IMG_4201.jpeg",        alt: "2022", caption: "2022" },
      { id: 225, src: "/gallery/2022/IMG_4227.jpeg",        alt: "2022", caption: "2022" },
      { id: 226, src: "/gallery/2022/IMG_4353.jpeg",        alt: "2022", caption: "2022" },
      { id: 227, src: "/gallery/2022/IMG_4397.jpeg",        alt: "2022", caption: "2022" },
      { id: 228, src: "/gallery/2022/IMG_4542.jpeg",        alt: "2022", caption: "2022" },
      { id: 229, src: "/gallery/2022/IMG_4651.jpeg",        alt: "2022", caption: "2022" },
      { id: 230, src: "/gallery/2022/IMG_4697.jpeg",        alt: "2022", caption: "2022" },
      { id: 231, src: "/gallery/2022/IMG_4752.jpeg",        alt: "2022", caption: "2022" },
      { id: 232, src: "/gallery/2022/IMG_4889.jpeg",        alt: "2022", caption: "2022" },
      { id: 233, src: "/gallery/2022/IMG_4983.jpeg",        alt: "2022", caption: "2022" },
      { id: 234, src: "/gallery/2022/IMG_4993.jpeg",        alt: "2022", caption: "2022" },
      { id: 235, src: "/gallery/2022/IMG_5115.jpeg",        alt: "2022", caption: "2022" },
      { id: 236, src: "/gallery/2022/IMG_5324.jpeg",        alt: "2022", caption: "2022" },
      { id: 237, src: "/gallery/2022/IMG_5382.jpeg",        alt: "2022", caption: "2022" },
      { id: 238, src: "/gallery/2022/IMG_5791.JPG",         alt: "2022", caption: "2022" },
      { id: 239, src: "/gallery/2022/IMG_6511.jpeg",        alt: "2022", caption: "2022" },
      { id: 240, src: "/gallery/2022/IMG_8404.jpeg",        alt: "2022", caption: "2022" },
      { id: 241, src: "/gallery/2022/IMG_8600.jpeg",        alt: "2022", caption: "2022" },
      { id: 242, src: "/gallery/2022/IMG_8687.jpeg",        alt: "2022", caption: "2022" },
      { id: 243, src: "/gallery/2022/IMG_8964.jpeg",        alt: "2022", caption: "2022" },
      { id: 244, src: "/gallery/2022/IMG_9014.jpeg",        alt: "2022", caption: "2022" },
      { id: 245, src: "/gallery/2022/IMG_9303.jpeg",        alt: "2022", caption: "2022" },
      { id: 246, src: "/gallery/2022/IMG_9402.jpeg",        alt: "2022", caption: "2022" },
      { id: 247, src: "/gallery/2022/IMG_9561.jpeg",        alt: "2022", caption: "2022" },
    ],
  },
  {
    year: 2021,
    shuffle: true, // randomise order each click
    photos: [
      { id: 100, src: "/gallery/2021/IMG_0833.JPG",  alt: "2021", caption: "2021" },
      { id: 101, src: "/gallery/2021/IMG_0948.jpeg", alt: "2021", caption: "2021" },
      { id: 102, src: "/gallery/2021/IMG_1009.JPG",  alt: "2021", caption: "2021" },
      { id: 103, src: "/gallery/2021/IMG_1400.jpeg", alt: "2021", caption: "2021" },
      { id: 104, src: "/gallery/2021/IMG_1476.JPG",  alt: "2021", caption: "2021" },
      { id: 105, src: "/gallery/2021/IMG_1490.JPG",  alt: "2021", caption: "2021" },
      { id: 106, src: "/gallery/2021/IMG_1516.jpeg", alt: "2021", caption: "2021" },
      { id: 107, src: "/gallery/2021/IMG_1656.jpeg", alt: "2021", caption: "2021" },
      { id: 108, src: "/gallery/2021/IMG_1660.jpeg", alt: "2021", caption: "2021" },
      { id: 109, src: "/gallery/2021/IMG_1756.jpeg", alt: "2021", caption: "2021" },
      { id: 110, src: "/gallery/2021/IMG_1758.jpeg", alt: "2021", caption: "2021" },
      { id: 111, src: "/gallery/2021/IMG_1816.jpeg", alt: "2021", caption: "2021" },
      { id: 112, src: "/gallery/2021/IMG_2181.jpeg", alt: "2021", caption: "2021" },
      { id: 113, src: "/gallery/2021/IMG_2208.jpeg", alt: "2021", caption: "2021" },
      { id: 114, src: "/gallery/2021/IMG_2303.jpeg", alt: "2021", caption: "2021" },
      { id: 115, src: "/gallery/2021/IMG_2335.JPG",  alt: "2021", caption: "2021" },
      { id: 116, src: "/gallery/2021/IMG_2492.JPG",  alt: "2021", caption: "2021" },
      { id: 117, src: "/gallery/2021/IMG_2521.JPG",  alt: "2021", caption: "2021" },
      { id: 118, src: "/gallery/2021/IMG_2522.JPG",  alt: "2021", caption: "2021" },
      { id: 119, src: "/gallery/2021/IMG_2524.JPG",  alt: "2021", caption: "2021" },
      { id: 120, src: "/gallery/2021/IMG_2566.JPG",  alt: "2021", caption: "2021" },
      { id: 121, src: "/gallery/2021/IMG_2688.JPG",  alt: "2021", caption: "2021" },
      { id: 122, src: "/gallery/2021/IMG_2794.jpeg", alt: "2021", caption: "2021" },
      { id: 123, src: "/gallery/2021/IMG_3097.JPG",  alt: "2021", caption: "2021" },
      { id: 124, src: "/gallery/2021/IMG_4833.jpeg", alt: "2021", caption: "2021" },
      { id: 125, src: "/gallery/2021/IMG_5207.jpeg", alt: "2021", caption: "2021" },
      { id: 126, src: "/gallery/2021/IMG_5821.jpeg", alt: "2021", caption: "2021" },
      { id: 127, src: "/gallery/2021/IMG_5973.jpeg", alt: "2021", caption: "2021" },
    ],
  },
];

const years = albums.map((a) => a.year);

// ─── PHOTOGRAPHY ─────────────────────────────────────────────────────────────
// Add photos from /public/gallery/photography/ here.
const allPhotographyPhotos: Photo[] = [
  { id: 9000, src: "/gallery/photography/IMG_2778.JPG", alt: "Photography", caption: "" },
  { id: 9001, src: "/gallery/photography/IMG_0525.jpg", alt: "Photography", caption: "" },
  { id: 9002, src: "/gallery/photography/IMG_1071.jpg", alt: "Photography", caption: "" },
  { id: 9003, src: "/gallery/photography/IMG_5213.jpg", alt: "Photography", caption: "" },
  { id: 9004, src: "/gallery/photography/IMG_9403.jpg", alt: "Photography", caption: "" },
];

type Filter = number | "photography";

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<Filter>("photography");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [displayedPhotos, setDisplayedPhotos] = useState<Photo[]>(
    allPhotographyPhotos
  );

  const selected = selectedIndex !== null ? displayedPhotos[selectedIndex] : null;

  const handleFilter = useCallback((filter: Filter) => {
    setActiveFilter(filter);
    setSelectedIndex(null);
    if (filter === "photography") {
      setDisplayedPhotos(allPhotographyPhotos);
    } else {
      const album = albums.find((a) => a.year === filter);
      const photos = album?.photos ?? [];
      setDisplayedPhotos(album?.shuffle ? shuffled(photos) : photos);
    }
  }, []);

  const goNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % displayedPhotos.length);
  }, [selectedIndex, displayedPhotos.length]);

  const goPrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + displayedPhotos.length) % displayedPhotos.length);
  }, [selectedIndex, displayedPhotos.length]);

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft")  goPrev();
      if (e.key === "Escape")     setSelectedIndex(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedIndex, goNext, goPrev]);

  return (
    <section id="gallery" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-yellow-500 mb-3">
            Photos
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900">
            Photo Gallery
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-2xl">
            Here are some favorite photos of my life. I worry that I don&apos;t
            do a good enough job of storing photos and that one day I won&apos;t
            have memories to show. Also a small photography gallery of some of
            my favorite photos/edits. I&apos;d like to spend more time
            practicing photography.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          {/* Photography pill */}
          <button
            onClick={() => handleFilter("photography")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeFilter === "photography"
                ? "bg-yellow-400 text-gray-900 shadow-sm"
                : "bg-white border border-gray-200 text-gray-500 hover:border-yellow-400 hover:text-gray-900"
            }`}
          >
            📷 Photography
          </button>

          {/* Divider */}
          <span className="w-px h-5 bg-gray-200 mx-1" />

          {/* Year pills */}
          {years.map((year) => (
            <button
              key={year}
              onClick={() => handleFilter(year)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeFilter === year
                  ? "bg-yellow-400 text-gray-900 shadow-sm"
                  : "bg-white border border-gray-200 text-gray-500 hover:border-yellow-400 hover:text-gray-900"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Photo count */}
        <p className="text-sm text-gray-400 mb-6">
          {displayedPhotos.length} photo{displayedPhotos.length !== 1 ? "s" : ""}
          {activeFilter === "photography" && " across all years"}
        </p>

        {/* Grid */}
        {displayedPhotos.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {displayedPhotos.map((photo, i) => (
              <button
                key={photo.id}
                onClick={() => setSelectedIndex(i)}
                className={`group relative overflow-hidden rounded-xl bg-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 ${
                  i === 0 && displayedPhotos.length > 2 ? "col-span-2" : ""
                }`}
                style={{
                  aspectRatio:
                    i === 0 && displayedPhotos.length > 2 ? "16/9" : "4/3",
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
                  <span className="w-full px-4 py-3 text-white text-sm font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent">
                    {photo.caption}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Empty state */}
        {displayedPhotos.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium">
              {activeFilter === "photography"
                ? "No photography shots tagged yet — add photography: true to photos in GallerySection.tsx"
                : `No photos yet for ${activeFilter}`}
            </p>
            {activeFilter !== "photography" && (
              <p className="text-sm mt-1">
                Add entries to the {activeFilter} album in GallerySection.tsx
              </p>
            )}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selected && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Prev arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
            aria-label="Previous photo"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Photo */}
          <div
            className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[70vh]">
              <Image
                key={selected.id}
                src={selected.src}
                alt={selected.alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            <div className="bg-black/60 px-6 py-4 flex items-center justify-between">
              <p className="text-white/60 text-sm">
                {selectedIndex + 1} / {displayedPhotos.length}
              </p>
              <button
                onClick={() => setSelectedIndex(null)}
                className="text-white/70 hover:text-white text-sm font-medium transition-colors"
              >
                Close ✕
              </button>
            </div>
          </div>

          {/* Next arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
            aria-label="Next photo"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
