// This file is part of Substrate.

// Copyright (C) 2021 Parity Technologies (UK) Ltd.
// SPDX-License-Identifier: Apache-2.0

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//! Autogenerated weights for pallet_cash
//!
//! THIS FILE WAS AUTO-GENERATED USING THE SUBSTRATE BENCHMARK CLI VERSION 2.0.0
//! DATE: 2021-05-03, STEPS: [10, ], REPEAT: 10, LOW RANGE: [], HIGH RANGE: []
//! EXECUTION: Some(Wasm), WASM-EXECUTION: Compiled, CHAIN: None, DB CACHE: 128

// Executed Command:
// ./target/release/gateway
// benchmark
// --execution
// wasm
// --wasm-execution
// compiled
// --pallet
// pallet_cash
// --extrinsic
// *
// --steps
// 10
// --repeat
// 10
// --raw
// --template=./.maintain/frame-weight-template.hbs
// --output=./pallets/cash/src/weights.rs


#![allow(unused_parens)]
#![allow(unused_imports)]

use frame_support::{traits::Get, weights::{Weight, constants::RocksDbWeight}};
use sp_std::marker::PhantomData;

/// Weight functions needed for pallet_cash.
pub trait WeightInfo {
	fn on_initialize(z: u32, ) -> Weight;
	fn publish_signature() -> Weight;
	fn set_yield_next() -> Weight;
	fn receive_chain_blocks() -> Weight;
	fn receive_chain_reorg_pending(z: u32, ) -> Weight;
	fn support_asset() -> Weight;
	fn set_rate_model() -> Weight;
	fn set_liquidity_factor() -> Weight;
	fn set_supply_cap() -> Weight;
	fn allow_next_code_with_hash() -> Weight;
	fn set_next_code_via_hash(z: u32, ) -> Weight;
	fn change_validators() -> Weight;
	fn exec_trx_request_extract() -> Weight;
	fn exec_trx_request_transfer() -> Weight;
	fn exec_trx_request_liquidate() -> Weight;
}

/// Weights for pallet_cash using the Substrate node and recommended hardware.
pub struct SubstrateWeight<T>(PhantomData<T>);
impl<T: frame_system::Config> WeightInfo for SubstrateWeight<T> {
	fn on_initialize(z: u32, ) -> Weight {
		(477_295_000 as Weight)
			// Standard Error: 1_377_000
			.saturating_add((7_468_000 as Weight).saturating_mul(z as Weight))
			.saturating_add(T::DbWeight::get().reads(28 as Weight))
			.saturating_add(T::DbWeight::get().writes(11 as Weight))
	}
	fn publish_signature() -> Weight {
		(257_000_000 as Weight)
			.saturating_add(T::DbWeight::get().reads(5 as Weight))
			.saturating_add(T::DbWeight::get().writes(1 as Weight))
	}
	fn set_yield_next() -> Weight {
		(162_000_000 as Weight)
			.saturating_add(T::DbWeight::get().reads(4 as Weight))
			.saturating_add(T::DbWeight::get().writes(6 as Weight))
	}
	fn receive_chain_blocks() -> Weight {
		(273_000_000 as Weight)
			.saturating_add(T::DbWeight::get().reads(6 as Weight))
			.saturating_add(T::DbWeight::get().writes(3 as Weight))
	}
	fn receive_chain_reorg_pending(z: u32, ) -> Weight {
		(284_289_000 as Weight)
			// Standard Error: 153_000
			.saturating_add((2_126_000 as Weight).saturating_mul(z as Weight))
			.saturating_add(T::DbWeight::get().reads(7 as Weight))
			.saturating_add(T::DbWeight::get().writes(1 as Weight))
	}
	fn support_asset() -> Weight {
		(40_000_000 as Weight)
			.saturating_add(T::DbWeight::get().writes(1 as Weight))
	}
	fn set_rate_model() -> Weight {
		(52_000_000 as Weight)
			.saturating_add(T::DbWeight::get().reads(1 as Weight))
			.saturating_add(T::DbWeight::get().writes(1 as Weight))
	}
	fn set_liquidity_factor() -> Weight {
		(51_000_000 as Weight)
			.saturating_add(T::DbWeight::get().reads(1 as Weight))
			.saturating_add(T::DbWeight::get().writes(1 as Weight))
	}
	fn set_supply_cap() -> Weight {
		(141_000_000 as Weight)
			.saturating_add(T::DbWeight::get().reads(2 as Weight))
			.saturating_add(T::DbWeight::get().writes(5 as Weight))
	}
	fn allow_next_code_with_hash() -> Weight {
		(32_000_000 as Weight)
			.saturating_add(T::DbWeight::get().writes(1 as Weight))
	}
	fn set_next_code_via_hash(z: u32, ) -> Weight {
		(50_876_000 as Weight)
			// Standard Error: 0
			.saturating_add((4_000 as Weight).saturating_mul(z as Weight))
			.saturating_add(T::DbWeight::get().reads(1 as Weight))
			.saturating_add(T::DbWeight::get().writes(1 as Weight))
	}
	fn change_validators() -> Weight {
		(291_000_000 as Weight)
			.saturating_add(T::DbWeight::get().reads(11 as Weight))
			.saturating_add(T::DbWeight::get().writes(12 as Weight))
	}
	fn exec_trx_request_extract() -> Weight {
		(542_000_000 as Weight)
			.saturating_add(T::DbWeight::get().reads(15 as Weight))
			.saturating_add(T::DbWeight::get().writes(12 as Weight))
	}
	fn exec_trx_request_transfer() -> Weight {
		(598_000_000 as Weight)
			.saturating_add(T::DbWeight::get().reads(20 as Weight))
			.saturating_add(T::DbWeight::get().writes(14 as Weight))
	}
	fn exec_trx_request_liquidate() -> Weight {
		(996_000_000 as Weight)
			.saturating_add(T::DbWeight::get().reads(33 as Weight))
			.saturating_add(T::DbWeight::get().writes(19 as Weight))
	}
}

// For backwards compatibility and tests
impl WeightInfo for () {
	fn on_initialize(z: u32, ) -> Weight {
		(477_295_000 as Weight)
			// Standard Error: 1_377_000
			.saturating_add((7_468_000 as Weight).saturating_mul(z as Weight))
			.saturating_add(RocksDbWeight::get().reads(28 as Weight))
			.saturating_add(RocksDbWeight::get().writes(11 as Weight))
	}
	fn publish_signature() -> Weight {
		(257_000_000 as Weight)
			.saturating_add(RocksDbWeight::get().reads(5 as Weight))
			.saturating_add(RocksDbWeight::get().writes(1 as Weight))
	}
	fn set_yield_next() -> Weight {
		(162_000_000 as Weight)
			.saturating_add(RocksDbWeight::get().reads(4 as Weight))
			.saturating_add(RocksDbWeight::get().writes(6 as Weight))
	}
	fn receive_chain_blocks() -> Weight {
		(273_000_000 as Weight)
			.saturating_add(RocksDbWeight::get().reads(6 as Weight))
			.saturating_add(RocksDbWeight::get().writes(3 as Weight))
	}
	fn receive_chain_reorg_pending(z: u32, ) -> Weight {
		(284_289_000 as Weight)
			// Standard Error: 153_000
			.saturating_add((2_126_000 as Weight).saturating_mul(z as Weight))
			.saturating_add(RocksDbWeight::get().reads(7 as Weight))
			.saturating_add(RocksDbWeight::get().writes(1 as Weight))
	}
	fn support_asset() -> Weight {
		(40_000_000 as Weight)
			.saturating_add(RocksDbWeight::get().writes(1 as Weight))
	}
	fn set_rate_model() -> Weight {
		(52_000_000 as Weight)
			.saturating_add(RocksDbWeight::get().reads(1 as Weight))
			.saturating_add(RocksDbWeight::get().writes(1 as Weight))
	}
	fn set_liquidity_factor() -> Weight {
		(51_000_000 as Weight)
			.saturating_add(RocksDbWeight::get().reads(1 as Weight))
			.saturating_add(RocksDbWeight::get().writes(1 as Weight))
	}
	fn set_supply_cap() -> Weight {
		(141_000_000 as Weight)
			.saturating_add(RocksDbWeight::get().reads(2 as Weight))
			.saturating_add(RocksDbWeight::get().writes(5 as Weight))
	}
	fn allow_next_code_with_hash() -> Weight {
		(32_000_000 as Weight)
			.saturating_add(RocksDbWeight::get().writes(1 as Weight))
	}
	fn set_next_code_via_hash(z: u32, ) -> Weight {
		(50_876_000 as Weight)
			// Standard Error: 0
			.saturating_add((4_000 as Weight).saturating_mul(z as Weight))
			.saturating_add(RocksDbWeight::get().reads(1 as Weight))
			.saturating_add(RocksDbWeight::get().writes(1 as Weight))
	}
	fn change_validators() -> Weight {
		(291_000_000 as Weight)
			.saturating_add(RocksDbWeight::get().reads(11 as Weight))
			.saturating_add(RocksDbWeight::get().writes(12 as Weight))
	}
	fn exec_trx_request_extract() -> Weight {
		(542_000_000 as Weight)
			.saturating_add(RocksDbWeight::get().reads(15 as Weight))
			.saturating_add(RocksDbWeight::get().writes(12 as Weight))
	}
	fn exec_trx_request_transfer() -> Weight {
		(598_000_000 as Weight)
			.saturating_add(RocksDbWeight::get().reads(20 as Weight))
			.saturating_add(RocksDbWeight::get().writes(14 as Weight))
	}
	fn exec_trx_request_liquidate() -> Weight {
		(996_000_000 as Weight)
			.saturating_add(RocksDbWeight::get().reads(33 as Weight))
			.saturating_add(RocksDbWeight::get().writes(19 as Weight))
	}
}
