import type { Investment } from '@/lib/types'

/**
 * VC -> portfolio company edges, sourced from CB Insights funding records.
 *
 * This exists because VC accountability could not be sourced any other way:
 * firms almost never take public positions, and political donations come from
 * individual partners, not the firm. What a fund CHOSE TO BACK is a documented,
 * verifiable fact about the firm itself — Founders Fund put money into Palantir
 * across 14 rounds and Anduril across 8.
 *
 * These are facts, not verdicts. A funding relationship is not a receipt and
 * does not affect any grade; it gives a VC page something true to show and lets
 * a reader follow the money themselves.
 */
export const investments: Investment[] = [
  { id: '1', vc_id: '5', company_id: '192', round: '14 rounds', date: '2006', amount: null },
  { id: '2', vc_id: '21', company_id: '192', round: '2 rounds', date: '2011', amount: null },
  { id: '3', vc_id: '175', company_id: '192', round: '1 round', date: '2014', amount: null },
  { id: '4', vc_id: '5', company_id: '241', round: '8 rounds', date: '2018', amount: null },
  { id: '5', vc_id: '253', company_id: '241', round: '6 rounds', date: '2017', amount: null },
  { id: '6', vc_id: '8', company_id: '241', round: '1 round', date: '2022', amount: null },
  { id: '7', vc_id: '112', company_id: '241', round: '1 round', date: '2017', amount: null },
  { id: '8', vc_id: '182', company_id: '241', round: '2 rounds', date: '2025', amount: null },
  { id: '9', vc_id: '29', company_id: '241', round: '1 round', date: '2025', amount: null },
  { id: '10', vc_id: '15', company_id: '11', round: '1 round', date: '2026', amount: null },
  { id: '11', vc_id: '5', company_id: '11', round: '2 rounds', date: '2023', amount: null },
  { id: '12', vc_id: '2', company_id: '11', round: '3 rounds', date: '2021', amount: null },
  { id: '13', vc_id: '113', company_id: '11', round: '3 rounds', date: '2019', amount: null },
  { id: '14', vc_id: '21', company_id: '11', round: '4 rounds', date: '2021', amount: null },
  { id: '15', vc_id: '29', company_id: '11', round: '3 rounds', date: '2025', amount: null },
  { id: '16', vc_id: '15', company_id: '201', round: '3 rounds', date: '2025', amount: null },
  { id: '17', vc_id: '19', company_id: '201', round: '4 rounds', date: '2023', amount: null },
  { id: '18', vc_id: '8', company_id: '201', round: '4 rounds', date: '2025', amount: null },
  { id: '19', vc_id: '13', company_id: '201', round: '3 rounds', date: '2024', amount: null },
  { id: '20', vc_id: '112', company_id: '201', round: '1 round', date: '2023', amount: null },
  { id: '21', vc_id: '5', company_id: '201', round: '1 round', date: '2026', amount: null },
  { id: '22', vc_id: '2', company_id: '201', round: '2 rounds', date: '2026', amount: null },
  { id: '23', vc_id: '3', company_id: '201', round: '1 round', date: '2026', amount: null },
  { id: '24', vc_id: '29', company_id: '201', round: '2 rounds', date: '2025', amount: null },
  { id: '25', vc_id: '6', company_id: '26', round: '2 rounds', date: '2015', amount: null },
  { id: '26', vc_id: '5', company_id: '26', round: '3 rounds', date: '2014', amount: null },
  { id: '27', vc_id: '2', company_id: '26', round: '13 rounds', date: '2011', amount: null },
  { id: '28', vc_id: '113', company_id: '26', round: '3 rounds', date: '2014', amount: null },
  { id: '29', vc_id: '21', company_id: '26', round: '2 rounds', date: '2018', amount: null },
  { id: '30', vc_id: '11', company_id: '26', round: '1 round', date: '2010', amount: null },
  { id: '31', vc_id: '17', company_id: '26', round: '1 round', date: '2012', amount: null },
  { id: '32', vc_id: '6', company_id: '91', round: '1 round', date: '2015', amount: null },
  { id: '33', vc_id: '5', company_id: '91', round: '1 round', date: '2012', amount: null },
  { id: '34', vc_id: '2', company_id: '91', round: '5 rounds', date: '2009', amount: null },
  { id: '35', vc_id: '21', company_id: '91', round: '1 round', date: '2015', amount: null },
  { id: '36', vc_id: '29', company_id: '91', round: '3 rounds', date: '2014', amount: null },
  { id: '37', vc_id: '7', company_id: '91', round: '3 rounds', date: '2010', amount: null },
  { id: '38', vc_id: '20', company_id: '81', round: '1 round', date: null, amount: null },
  { id: '39', vc_id: '12', company_id: '81', round: '1 round', date: '2015', amount: null },
  { id: '40', vc_id: '6', company_id: '81', round: '1 round', date: '2014', amount: null },
  { id: '41', vc_id: '19', company_id: '81', round: '2 rounds', date: '2011', amount: null },
  { id: '42', vc_id: '2', company_id: '81', round: '1 round', date: '2018', amount: null },
  { id: '43', vc_id: '4', company_id: '81', round: '3 rounds', date: '2011', amount: null },
  { id: '44', vc_id: '143', company_id: '81', round: '1 round', date: null, amount: null },
  { id: '45', vc_id: '112', company_id: '32', round: '1 round', date: '2017', amount: null },
  { id: '46', vc_id: '16', company_id: '32', round: '1 round', date: '2017', amount: null },
  { id: '47', vc_id: '21', company_id: '32', round: '1 round', date: '2018', amount: null },
  { id: '48', vc_id: '7', company_id: '32', round: '1 round', date: '2017', amount: null },
  { id: '49', vc_id: '11', company_id: '32', round: '2 rounds', date: '2012', amount: null },
  { id: '50', vc_id: '1', company_id: '32', round: '3 rounds', date: '2013', amount: null },
  { id: '51', vc_id: '36', company_id: '32', round: '1 round', date: '2013', amount: null },
  { id: '52', vc_id: '6', company_id: '73', round: '2 rounds', date: '2015', amount: null },
  { id: '53', vc_id: '2', company_id: '73', round: '6 rounds', date: '2014', amount: null },
  { id: '54', vc_id: '113', company_id: '73', round: '3 rounds', date: '2014', amount: null },
  { id: '55', vc_id: '119', company_id: '73', round: '2 rounds', date: '2014', amount: null },
  { id: '56', vc_id: '29', company_id: '73', round: '2 rounds', date: '2019', amount: null },
  { id: '57', vc_id: '11', company_id: '73', round: '3 rounds', date: '2013', amount: null },
  { id: '58', vc_id: '27', company_id: '73', round: '3 rounds', date: '2018', amount: null },
  { id: '59', vc_id: '2', company_id: '28', round: '6 rounds', date: '2010', amount: null },
  { id: '60', vc_id: '68', company_id: '28', round: '3 rounds', date: '2015', amount: null },
  { id: '61', vc_id: '131', company_id: '28', round: '3 rounds', date: '2011', amount: null },
  { id: '62', vc_id: '27', company_id: '28', round: '2 rounds', date: '2011', amount: null },
  { id: '63', vc_id: '42', company_id: '28', round: '1 round', date: '2011', amount: null },
  { id: '64', vc_id: '70', company_id: '28', round: '1 round', date: null, amount: null },
]
