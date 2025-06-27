import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@/lib/auth'
import { getWalletByUserId } from '@/actions/wallet'

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser()
    
    if (!user || !user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const walletResult = await getWalletByUserId(user.id)
    
    if (!walletResult.success || !walletResult.wallet) {
      return NextResponse.json({ error: 'Wallet not found' }, { status: 404 })
    }

    return NextResponse.json({ 
      balance: walletResult.wallet.balance,
      walletId: walletResult.wallet.id
    })
  } catch (error) {
    console.error('Error fetching wallet balance:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
