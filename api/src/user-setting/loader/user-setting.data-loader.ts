import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { UserSettingService } from 'src/user-setting/service';
import { UserSetting } from 'src/user-setting/model';

declare type Value = UserSetting;
declare type Key = UserSetting['id'];

@Injectable({ scope: Scope.REQUEST })
export class UserSettingDataLoader {
	private findByIdsLoader: DataLoader<Key, Value, Key>;

	private findByUserIdsLoader: DataLoader<Key, Value, Key>;

	constructor(private readonly userSettingService: UserSettingService) {
		this.findByIdsLoader = new DataLoader<Key, Value>((keys: Key[]) =>
			this.userSettingService.findByIds(keys),
		);

		this.findByUserIdsLoader = new DataLoader<Key, Value>((keys: Key[]) =>
			this.userSettingService.findByUserIds(keys),
		);
	}

	async loadById(key: Key): Promise<Value> {
		return this.findByIdsLoader.load(key);
	}

	async loadByUserId(key: Key): Promise<Value> {
		return this.findByUserIdsLoader.load(key);
	}
}
