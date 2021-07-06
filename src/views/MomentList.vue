<template>
  <div class="page">
    <div class="contentContainer">
      <div class="titleContainer borderRadius">
        <div>热门</div>
        <div>实时</div>
        <div>关注</div>
        <div>附近</div>
      </div>
      <div class="momentList borderRadius">
        <div class="momentItem borderRadius" v-for="(item,index) in moments" :key="index">
          <!--用户信息-->
          <div class="top">
            <el-avatar class="headPic" shape="square" :src="item.headPic"></el-avatar>
            <div class="title">
              <div class="nickName">{{item.nickName}}</div>
              <div class="baseInfo">
                <span>{{item.year}} -</span>
                <span>{{item.education}} -</span>
                <span>{{item.currentCity}} -</span>
                <span>{{item.work}}</span>
              </div>
            </div>
          </div>
          <!--动态-->
          <div class="content">
            <div class="desc">
              {{item.content}}
            </div>
            <div class="pics">
              <el-image :src="pic" v-for="(pic,index) in item.pictures" :key="index"></el-image>
            </div>
            <div class="bottom">
              <div class="bottomItem">
                <div v-if="!item.like" class="fa fa-heart-o"></div>
                <div v-else class="fa fa-heart redColor"></div>
                <div class="count">{{item.likeCount}}</div>
              </div>
              <div class="bottomItem">
                <div class="fa fa-commenting"></div>
                <div class="count">{{item.commentCount}}</div>
              </div>
              <div class="bottomItem">
                <span class="fa fa-share-square"></span>
              </div>
            </div>
          </div>
          <!--评论-->
          <div class="commentContainer">
            <div class="replyContainer">
              <div>
                <el-avatar shape="circle" :src="item.headPic"></el-avatar>
                <el-input class="reply" autosize type="textarea" placeholder="请输入内容" v-model="myComment.content" maxlength="500"></el-input>
              </div>
              <div class="replyButton">
                <div></div>
                <div>
                  <el-button size="medium" round>发表</el-button>
                </div>
              </div>
            </div>
            <div class="commentItem" v-for="(comment,index) in item.comments" :key="index">
              <div class="commentTop">
                <div class="topLeft">
                  <el-avatar class="commentHeadPic" shape="circle" :src="comment.headPic"></el-avatar>
                  <div>
                    <div style="font-size:14px;margin-bottom:6px">{{comment.nickName}}</div>
                    <div style="font-size:12px">
                      <span>{{comment.year}}年 -</span>
                      <span>{{comment.education}} -</span>
                      <span>{{comment.currentCity}} -</span>
                      <span>{{comment.work}}</span>
                    </div>
                  </div>
                </div>
                <div class="topRight">
                  <div v-if="!comment.like" class="fa fa-heart-o"></div>
                  <div v-else class="fa fa-heart redColor"></div>
                </div>
              </div>
              <div class="commentContent">
                {{comment.content}}
              </div>
              <div class="commentBottom">
                <div>{{comment.createTime}}</div>
                <el-tooltip class="item" effect="dark" content="投诉" placement="top">
                  <span class="el-icon-warning-outline" style="font-size:20px"></span>
                </el-tooltip>
              </div>
              <div class="replyItem" v-for="(reply,index) in comment.replys" :key="index">
                <div class="replyTop">
                  <div class="replyTopLeft">
                    <el-avatar class="replyHeadPic" shape="circle" :src="reply.headPic"></el-avatar>
                    <div>
                      <div style="font-size:14px;margin-bottom:6px">{{reply.nickName}}</div>
                      <div style="font-size:12px">
                        <span>{{reply.year}}年 -</span>
                        <span>{{reply.education}} -</span>
                        <span>{{reply.currentCity}} -</span>
                        <span>{{reply.work}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="replyTopRight">
                    <div v-if="!reply.like" class="fa fa-heart-o"></div>
                    <div v-else class="fa fa-heart redColor"></div>
                  </div>
                </div>
                <div class="replyContent">
                  {{reply.content}}
                </div>
                <div class="replyBottom">
                  <div>{{comment.createTime}}</div>
                  <el-tooltip class="item" effect="dark" content="投诉" placement="top">
                    <span class="el-icon-warning-outline" style="font-size:20px"></span>
                  </el-tooltip>
                </div>
              </div>
            </div>
            <el-divider></el-divider>
          </div>
        </div>
      </div>
    </div>
    <div class="topicContainer">
      <span>热门话题</span>
      <span>热门话题</span>
      <span>热门话题</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryInfo: {
        pageIndex: 1,
        pageSize: 20,
      },
      moments: [
        {
          nickName: "文件传输助手",
          year: "00",
          currentCity: "杭州",
          work: "工程师",
          education: "本科",
          like: true,
          likeCount: 102,
          commentCount: 100,
          headPic:
            "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
          content:
            "花园快收拾好啦，挖几根甜脆的茭瓜拌米线吃家里猪圈牛圈改造基本收尾，大部分工作都是请村里的师傅做好的。这几天的茭瓜正是季节，甜甜嫩嫩的，特别特别脆甜，炒肉好香。在云南忙的时候就直接烫一碗菌香干拌米线，1分钟搞定，满满一碗，真是幸福感满满~",
          pictures: [
            "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
            "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
            "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
            "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
          ],
          comments: [
            {
              id: 1234,
              headPic:
                "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
              nickName: "文件传输助手",
              year: "98",
              currentCity: "杭州",
              work: "工程师",
              education: "本科",
              content:
                "花园快收拾好啦，挖几根甜脆的茭瓜拌米线吃家里猪圈牛圈改造基本收尾，大部分工作都是请村里的师傅做好的。这几天的茭瓜正是季节，甜甜嫩嫩的",
              createTime: "7-5 11:49",
              like: true,
              replys: [
                {
                  id: 1234,
                  headPic:
                    "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
                  nickName: "文件传输助手",
                  year: "98",
                  currentCity: "杭州",
                  work: "工程师",
                  education: "本科",
                  content:
                    "花园快收拾好啦，挖几根甜脆的茭瓜拌米线吃家里猪圈牛圈改造基本收尾，大部分工作都是请村里的师傅做好的。这几天的茭瓜正是季节，甜甜嫩嫩的",
                  createTime: "7-5 11:49",
                  like: false,
                },
                {
                  id: 1234,
                  headPic:
                    "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
                  nickName: "文件传输助手",
                  year: "98",
                  currentCity: "杭州",
                  work: "工程师",
                  education: "本科",
                  content:
                    "花园快收拾好啦，挖几根甜脆的茭瓜拌米线吃家里猪圈牛圈改造基本收尾，大部分工作都是请村里的师傅做好的。这几天的茭瓜正是季节，甜甜嫩嫩的",
                  createTime: "7-5 11:49",
                  like: true,
                },
              ],
            },
            {
              id: 1234,
              headPic:
                "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
              nickName: "文件传输助手",
              year: "98",
              currentCity: "杭州",
              work: "工程师",
              education: "本科",
              content:
                "花园快收拾好啦，挖几根甜脆的茭瓜拌米线吃家里猪圈牛圈改造基本收尾，大部分工作都是请村里的师傅做好的。这几天的茭瓜正是季节，甜甜嫩嫩的",
              createTime: "7-5 11:49",
              like: true,
            },
            {
              id: 1234,
              headPic:
                "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
              nickName: "文件传输助手",
              year: "98",
              currentCity: "杭州",
              work: "工程师",
              education: "本科",
              content:
                "花园快收拾好啦，挖几根甜脆的茭瓜拌米线吃家里猪圈牛圈改造基本收尾，大部分工作都是请村里的师傅做好的。这几天的茭瓜正是季节，甜甜嫩嫩的",
              createTime: "7-5 11:49",
              like: true,
            },
          ],
        },
        {
          nickName: "文件传输助手",
          year: "00",
          currentCity: "杭州",
          work: "工程师",
          education: "本科",
          like: false,
          likeCount: 102,
          commentCount: 100,
          headPic:
            "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
          content:
            "花园快收拾好啦，挖几根甜脆的茭瓜拌米线吃家里猪圈牛圈改造基本收尾，大部分工作都是请村里的师傅做好的。这几天的茭瓜正是季节，甜甜嫩嫩的，特别特别脆甜，炒肉好香。在云南忙的时候就直接烫一碗菌香干拌米线，1分钟搞定，满满一碗，真是幸福感满满~",
          pictures: [
            "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
            "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
            "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
          ],
        },
        {
          nickName: "文件传输助手",
          year: "00",
          currentCity: "杭州",
          work: "工程师",
          education: "本科",
          like: true,
          likeCount: 102,
          commentCount: 100,
          headPic:
            "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
          content:
            "花园快收拾好啦，挖几根甜脆的茭瓜拌米线吃家里猪圈牛圈改造基本收尾，大部分工作都是请村里的师傅做好的。这几天的茭瓜正是季节，甜甜嫩嫩的，特别特别脆甜，炒肉好香。在云南忙的时候就直接烫一碗菌香干拌米线，1分钟搞定，满满一碗，真是幸福感满满~",
          pictures: [
            "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
            "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
            "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
          ],
        },
      ],
      totalCount: 0,
      user: {
        headPic:
          "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
      },
      reply: {},
      myComment: {
        content: "",
      },
      comments: [
        {
          userId: 1234,
          nickName: "文件传输助手",
          year: "00",
          currentCity: "杭州",
          work: "工程师",
          education: "本科",
          headPic:
            "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
          content: "说的很好",
          createTime: "2020-01-01 12:12:56",
          likeCount: 10,
          replyCount: 20,
          like: true,
        },
        {
          userId: 1234,
          nickName: "文件传输助手",
          year: "00",
          currentCity: "杭州",
          work: "工程师",
          education: "本科",
          headPic:
            "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
          content: "说的很好",
          createTime: "2020-01-01 12:12:56",
          likeCount: 10,
          replyCount: 20,
          like: true,
        },
      ],
    };
  },
  methods: {
    redirect(path) {
      this.$router.push(path);
    },
  },
  created() {},
};
</script>
<style lang="less" scoped>
.page {
  width: 100%;
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
}
.contentContainer {
  width: 700px;
  padding: 0px 10px;
  .titleContainer {
    width: 674px;
    height: 44px;
    font-size: 16px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    margin-bottom: 10px;
    div {
      width: 60px;
      height: 28px;
      line-height: 28px;
      border-radius: 14px;
      margin: 0 5px;
      text-align: center;
    }
    div:hover {
      background-color: #f2f2f2;
    }
  }
}
.momentList {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  .momentItem {
    width: 640px;
    padding: 20px 20px 14px 14px;
    background-color: #fff;
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }
  .top {
    display: flex;
    justify-content: flex-start;
    height: 50px;
    .headPic {
      width: 50px;
      height: 50px;
    }
    .title {
      width: 640px;
      margin-left: 10px;
      display: flex;
      padding: 5px;
      justify-content: space-between;
      flex-direction: column;
      height: 40px;
      margin-bottom: 6px;
    }
  }
  .content {
    margin-left: 50px;
    .desc {
      line-height: 1.5;
      font-size: 16px;
    }
    .pics {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      .el-image {
        margin-top: 8px;
        width: 188px;
        height: 188px;
        border-radius: 5px;
      }
    }
    .bottom {
      margin: 20px 0 0 0;
      width: 580px;
      display: flex;
      justify-content: space-between;
    }
    .bottomItem {
      display: flex;
      justify-content: flex-start;
      color: grey;
      .count {
        font-size: 12px;
        line-height: 16px;
        margin-left: 6px;
      }
    }
    .bottomItem:hover {
      color: #ff6666;
    }
  }
  .commentContainer {
    margin-top: 20px;
    .replyContainer {
      display: flex;
      justify-content: flex-start;
      flex-direction: column;

      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .reply {
        margin-left: 10px;
      }
    }
    .replyButton {
      margin-top: 8px;
    }
    .commentItem {
      .commentTop {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px 10px 0px;
        .topLeft {
          display: flex;
          justify-content: flex-start;
        }
        .commentHeadPic {
          margin-right: 10px;
        }
      }
      .commentContent {
        margin-left: 50px;
        font-size: 14px;
        margin-bottom: 10px;
        padding-right: 20px;
      }
      .commentBottom {
        color: #939393;
        margin-left: 50px;
        padding: 0 20px 10px 0;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        line-height: 20px;
      }
      .replyItem {
        margin-left: 60px;
        font-size: 14px;
        .replyTop {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .replyTopLeft {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .replyHeadPic {
              margin-right: 10px;
            }
          }
          .replyTopRight {
            padding-right: 20px;
          }
        }
        .replyContent {
          display: flex;
          justify-content: flex-start;
          padding: 10px 20px 10px 50px;
        }
        .replyBottom {
          display: flex;
          color: #939393;
          justify-content: space-between;
          padding: 0 20px 10px 50px;
          font-size: 12px;
          line-height: 20px;
        }
      }
    }
  }
}
.el-button {
  background-color: #ff7777;
  color: #fff;
}
.el-button:hover {
  background-color: #ff6666;
  color: #fff;
}
.el-divider {
  margin: 10px 0;
  color: #f9f9f9;
}
.nickName {
  font-size: 16px;
  font-weight: 500;
}
.baseInfo {
  font-size: 10px;
  display: flex;
  justify-content: space-between;
  width: 130px;
}

.topicContainer {
  width: 260px;
  height: 400px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
}

.redColor {
  color: #ff6666;
}
.borderRadius {
  border-radius: 8px;
}
</style>