import {
  BoostRewardGuard,
  BoostVoucherGuard,
  BoostSubgraph
} from '@/helpers/boost/types';

export async function getRewards(
  proposal_id: string,
  voter_address: string,
  boosts: BoostSubgraph[]
): Promise<BoostRewardGuard[]> {
  const results = await fetch(
    'https://boost-guard-djc2x.ondigitalocean.app/get-rewards',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        proposal_id,
        voter_address,
        boosts: boosts.map(boost => [boost.id, boost.chainId])
      })
    }
  );

  if (results.status !== 200) throw new Error('Error fetching rewards');
  return results.json();
}

export async function getVouchers(
  proposal_id: string,
  voter_address: string,
  boosts: BoostSubgraph[]
): Promise<BoostVoucherGuard[]> {
  const results = await fetch(
    'https://boost-guard-djc2x.ondigitalocean.app/create-vouchers',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        proposal_id,
        voter_address,
        boosts: boosts.map(boost => [boost.id, boost.chainId])
      })
    }
  );

  if (results.status !== 200) throw new Error('Error fetching vouchers');
  return results.json();
}