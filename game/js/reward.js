class Reward {
    constructor() {
        this.newRewards = true;
        this.rewardsList = [];
        this.rewardsScore = 0;
        this.level = 1;
        this.magicScore = 0;
        this.fourScoreVariables = [];
    }

        this.imageBook01 = [
            "assets/src/sprites/Icons/icons/16x16/book_01d.png",
            "assets/src/sprites/Icons/icons/16x16/book_02d.png",
            "assets/src/sprites/Icons/icons/16x16/book_03d.png",
            "assets/src/sprites/Icons/icons/16x16/book_04d.png",
            "assets/src/sprites/Icons/icons/16x16/book_05d.png",
        ];
        this.imageCandy01 = [
            "assets/src/sprites/Icons/icons/16x16/candy_01a.png",
            "assets/src/sprites/Icons/icons/16x16/candy_01b.png",
            "assets/src/sprites/Icons/icons/16x16/candy_01c.png",
            "assets/src/sprites/Icons/icons/16x16/candy_01d.png",
            "assets/src/sprites/Icons/icons/16x16/candy_01g.png",
        ];
        this.imageCandy02 = [
            "assets/src/sprites/Icons/icons/16x16/candy_02a.png",
            "assets/src/sprites/Icons/icons/16x16/candy_02b.png",
            "assets/src/sprites/Icons/icons/16x16/candy_02c.png",
            "assets/src/sprites/Icons/icons/16x16/candy_02d.png",
            "assets/src/sprites/Icons/icons/16x16/candy_02f.png",
        ];
        this.imageCrystal = [
            "assets/src/sprites/Icons/icons/16x16/crystal_01a.png",
            "assets/src/sprites/Icons/icons/16x16/crystal_01b.png",
            "assets/src/sprites/Icons/icons/16x16/crystal_01c.png",
            "assets/src/sprites/Icons/icons/16x16/crystal_01d.png",
            "assets/src/sprites/Icons/icons/16x16/crystal_01e.png",
        ];
        this.imageGift = [
            "assets/src/sprites/Icons/icons/16x16/gift_01a.png",
            "assets/src/sprites/Icons/icons/16x16/gift_01b.png",
            "assets/src/sprites/Icons/icons/16x16/gift_01c.png",
            "assets/src/sprites/Icons/icons/16x16/gift_01e.png",
            "assets/src/sprites/Icons/icons/16x16/gift_01f.png",
        ];
        this.imageHat = [
            "assets/src/sprites/Icons/icons/16x16/hat_01a.png",
            "assets/src/sprites/Icons/icons/16x16/hat_01b.png",
            "assets/src/sprites/Icons/icons/16x16/hat_01c.png",
            "assets/src/sprites/Icons/icons/16x16/hat_01d.png",
            "assets/src/sprites/Icons/icons/16x16/hat_01e.png",
        ];
        this.imageNecklace = [
            "assets/src/sprites/Icons/icons/16x16/necklace_01b.png",
            "assets/src/sprites/Icons/icons/16x16/necklace_01d.png",
            "assets/src/sprites/Icons/icons/16x16/necklace_01e.png",
            "assets/src/sprites/Icons/icons/16x16/necklace_02a.png",
            "assets/src/sprites/Icons/icons/16x16/necklace_02c.png",
        ];
        this.imagePotion = [
            "assets/src/sprites/Icons/icons/16x16/potion_02a.png",
            "assets/src/sprites/Icons/icons/16x16/potion_02b.png",
            "assets/src/sprites/Icons/icons/16x16/potion_02c.png",
            "assets/src/sprites/Icons/icons/16x16/potion_02d.png",
            "assets/src/sprites/Icons/icons/16x16/potion_02e.png",
        ];
        this.imageShard = [
            "assets/src/sprites/Icons/icons/16x16/shard_01a.png",
            "assets/src/sprites/Icons/icons/16x16/shard_01b.png",
            "assets/src/sprites/Icons/icons/16x16/shard_01c.png",
            "assets/src/sprites/Icons/icons/16x16/shard_01d.png",
            "assets/src/sprites/Icons/icons/16x16/shard_01f.png",
        ];
        this.imageStaff02 = [
            "assets/src/sprites/Icons/icons/16x16/staff_02ab.png",
            "assets/src/sprites/Icons/icons/16x16/staff_02b.png",
            "assets/src/sprites/Icons/icons/16x16/staff_02c.png",
            "assets/src/sprites/Icons/icons/16x16/staff_02d.png",
            "assets/src/sprites/Icons/icons/16x16/staff_02e.png",
        ];
        this.imageStaff03 = [
            "assets/src/sprites/Icons/icons/16x16/staff_03a.png",
            "assets/src/sprites/Icons/icons/16x16/staff_03b.png",
            "assets/src/sprites/Icons/icons/16x16/staff_03c.png",
            "assets/src/sprites/Icons/icons/16x16/staff_03d.png",
            "assets/src/sprites/Icons/icons/16x16/staff_03e.png",
        ];
    };
    reset() {
        this.newRewards = true;
        this.rewardsList = [];
        this.rewardsScore = 0;
        this.magicScore = 0;
        this.level = 1;
        $("#level").text(this.level);
        $("#rewardsScore").text(this.rewardsScore);
        $("#magicScore").text(this.magicScore);
    }
    countScore() {
        this.fourScoreVariables = generateRandomBetween(4,1,3);
        for (let r = 0; r < this.rewardsList.length; r++) {
            if (player.col === this.rewardsList[r][0] && player.row === this.rewardsList[r][1]) {
                this.magicScore += this.fourScoreVariables.reduce((a, b) => a * b);
                this.rewardsScore += 1;
                $("#rewardsScore").text(this.rewardsScore);
                $("#magicScore").text(this.magicScore);
                this.rewardsList.splice(r, 1);
                if (this.rewardsList.length === 0) {
                    this.newRewards = true;
                    this.level += 1;
                    $("#level").text(this.level);
                }
                break;
            }
        }
    };

    generateRandomItem(){
        let item  = Math.floor(randomModule.random() * 11);
        let index = Math.floor(randomModule.random() * 5);
        switch(item){
            case 0:
                return this.imageBook01[index];
            case 1:
                return this.imageCandy01[index];
            case 2:
                return this.imageCandy02[index];
            case 3:
                return this.imageCrystal[index];
            case 4:
                return this.imageGift[index];
            case 5:
                return this.imageHat[index];
            case 6:
                return this.imageNecklace[index];
            case 7:
                return this.imagePotion[index];
            case 8:
                return this.imageShard[index];
            case 9:
                return this.imageStaff02[index];
            case 10:
                return this.imageStaff03[index];
        }
    };
}