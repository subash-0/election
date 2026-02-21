import candidates from './candidates.json';

export interface Candidate {
  CandidateID: number;
  CandidateName: string;
  AGE_YR: number;
  Gender: string;
  PoliticalPartyName: string;
  QUALIFICATION: string;
  StateName: string;
  DistrictName: string;
  EXPERIENCE: string;
}

// Gender Analysis
export function getGenderAnalysis() {
  const genderCounts: Record<string, number> = {};
  
  (candidates as Candidate[]).forEach((candidate) => {
    const gender = candidate.Gender || 'अज्ञात';
    genderCounts[gender] = (genderCounts[gender] || 0) + 1;
  });

  return Object.entries(genderCounts).map(([name, value]) => ({
    name: name === 'पुरुष' ? 'पुरुष' : name === 'महिला' ? 'महिला' : 'अन्य',
    value,
    percentage: ((value / (candidates as Candidate[]).length) * 100).toFixed(1),
  }));
}

// Age Group Analysis
export function getAgeGroupAnalysis() {
  const ageGroups: Record<string, number> = {
    '20-30': 0,
    '30-40': 0,
    '40-50': 0,
    '50-60': 0,
    '60+': 0,
  };

  (candidates as Candidate[]).forEach((candidate) => {
    const age = candidate.AGE_YR || 0;
    if (age < 30) ageGroups['20-30']++;
    else if (age < 40) ageGroups['30-40']++;
    else if (age < 50) ageGroups['40-50']++;
    else if (age < 60) ageGroups['50-60']++;
    else ageGroups['60+']++;
  });

  return Object.entries(ageGroups).map(([name, value]) => ({
    name,
    value,
    percentage: ((value / (candidates as Candidate[]).length) * 100).toFixed(1),
  }));
}

// Education Analysis
export function getEducationAnalysis() {
  const educationCounts: Record<string, number> = {};

  (candidates as Candidate[]).forEach((candidate) => {
    const qualification = candidate.QUALIFICATION || 'अज्ञात';
    educationCounts[qualification] = (educationCounts[qualification] || 0) + 1;
  });

  return Object.entries(educationCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, value]) => ({
      name,
      value,
      percentage: ((value / (candidates as Candidate[]).length) * 100).toFixed(1),
    }));
}

// Party Analysis
export function getPartyAnalysis() {
  const partyCounts: Record<string, number> = {};

  (candidates as Candidate[]).forEach((candidate) => {
    const party = candidate.PoliticalPartyName || 'अज्ञात';
    partyCounts[party] = (partyCounts[party] || 0) + 1;
  });

  return Object.entries(partyCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([name, value]) => ({
      name,
      value,
      percentage: ((value / (candidates as Candidate[]).length) * 100).toFixed(1),
    }));
}

// Party and Age Group Analysis
export function getPartyAgeAnalysis() {
  const ageGroups = ['20-30', '30-40', '40-50', '50-60', '60+'];
  const partyAgeData: Record<string, Record<string, number>> = {};

  (candidates as Candidate[]).forEach((candidate) => {
    const party = candidate.PoliticalPartyName || 'अज्ञात';
    const age = candidate.AGE_YR || 0;
    let ageGroup = '20-30';

    if (age >= 30 && age < 40) ageGroup = '30-40';
    else if (age >= 40 && age < 50) ageGroup = '40-50';
    else if (age >= 50 && age < 60) ageGroup = '50-60';
    else if (age >= 60) ageGroup = '60+';

    if (!partyAgeData[party]) {
      partyAgeData[party] = { '20-30': 0, '30-40': 0, '40-50': 0, '50-60': 0, '60+': 0 };
    }
    partyAgeData[party][ageGroup]++;
  });

  return Object.entries(partyAgeData)
    .sort((a, b) => {
      const totalA = Object.values(a[1]).reduce((sum, v) => sum + v, 0);
      const totalB = Object.values(b[1]).reduce((sum, v) => sum + v, 0);
      return totalB - totalA;
    })
    .slice(0, 8)
    .map(([party, ages]) => ({
      party,
      ...ages,
    }));
}

// Province and Education Analysis
export function getProvinceEducationAnalysis() {
  const provinceEducationData: Record<string, Record<string, number>> = {};

  (candidates as Candidate[]).forEach((candidate) => {
    const province = candidate.StateName || 'अज्ञात';
    const education = candidate.QUALIFICATION || 'अज्ञात';

    if (!provinceEducationData[province]) {
      provinceEducationData[province] = {};
    }
    if (!provinceEducationData[province][education]) {
      provinceEducationData[province][education] = 0;
    }
    provinceEducationData[province][education]++;
  });

  return Object.entries(provinceEducationData)
    .map(([province, educations]) => ({
      province,
      educations: Object.entries(educations)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([edu, count]) => ({
          education: edu,
          count,
        })),
    }));
}

// Party and Education Analysis
export function getPartyEducationAnalysis() {
  const partyEducationData: Record<string, Record<string, number>> = {};

  (candidates as Candidate[]).forEach((candidate) => {
    const party = candidate.PoliticalPartyName || 'अज्ञात';
    const education = candidate.QUALIFICATION || 'अज्ञात';

    if (!partyEducationData[party]) {
      partyEducationData[party] = {};
    }
    if (!partyEducationData[party][education]) {
      partyEducationData[party][education] = 0;
    }
    partyEducationData[party][education]++;
  });

  return Object.entries(partyEducationData)
    .sort((a, b) => {
      const totalA = Object.values(a[1]).reduce((sum, v) => sum + v, 0);
      const totalB = Object.values(b[1]).reduce((sum, v) => sum + v, 0);
      return totalB - totalA;
    })
    .slice(0, 10)
    .map(([party, educations]) => ({
      party,
      educations: Object.entries(educations)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(([edu, count]) => ({
          education: edu,
          count,
        })),
    }));
}

// Summary Statistics
export function getSummaryStats() {
  const totalCandidates = (candidates as Candidate[]).length;
  const femaleCount = (candidates as Candidate[]).filter((c) => c.Gender === 'महिला').length;
  const maleCount = (candidates as Candidate[]).filter((c) => c.Gender === 'पुरुष').length;
  const avgAge =
    (candidates as Candidate[]).reduce((sum, c) => sum + (c.AGE_YR || 0), 0) /
    totalCandidates;
  const totalParties = new Set((candidates as Candidate[]).map((c) => c.PoliticalPartyName))
    .size;
  const totalProvinces = new Set((candidates as Candidate[]).map((c) => c.StateName)).size;

  return {
    totalCandidates,
    femaleCount,
    maleCount,
    femalePercentage: ((femaleCount / totalCandidates) * 100).toFixed(1),
    avgAge: avgAge.toFixed(1),
    totalParties,
    totalProvinces,
  };
}
