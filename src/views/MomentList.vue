<template>
  <div class="page">
    <div class="contentContainer">
      <div class="titleContainer borderRadius">
        <div @click="chooseTitle(1)" :class="1==currentIndex?'chooseTitle':''">热门</div>
        <div @click="chooseTitle(2)" :class="2==currentIndex?'chooseTitle':''">实时</div>
        <div @click="chooseTitle(3)" :class="3==currentIndex?'chooseTitle':''">关注</div>
        <div @click="chooseTitle(4)" :class="4==currentIndex?'chooseTitle':''">附近</div>
      </div>
      <div class="momentList borderRadius">
        <div class="momentItem borderRadius" v-for="(moment,index) in moments" :key="index">
          <!--用户信息-->
          <div class="top pointer">
            <el-avatar class="headPic" shape="square" :src="moment.headPic"></el-avatar>
            <div class="title">
              <div class="nickName">{{moment.nickName}}</div>
              <div class="baseInfo">
                <span>{{moment.year}}年 -</span>
                <span>{{moment.education}} -</span>
                <span>{{moment.currentCity}} -</span>
                <span>{{moment.work}}</span>
              </div>
            </div>
          </div>
          <!--动态-->
          <div class="content">
            <div class="desc">
              {{moment.content}}
            </div>
            <div class="pics">
              <el-image :src="pic" v-for="(pic,index) in moment.pictures" :key="index" :preview-src-list="moment.pictures"></el-image>
            </div>
            <div class="bottom">
              <div class="bottomItem">
                <div v-if="!moment.like" class="fa fa-heart-o"></div>
                <div v-else class="fa fa-heart redColor"></div>
                <div class="count">{{moment.likeCount}}</div>
              </div>
              <div class="bottomItem" @click="unfoldComment(moment.id)">
                <div class="el-icon-chat-dot-round"></div>
                <div class="count">{{moment.commentCount}}</div>
              </div>
              <div class="bottomItem">
                <span class="el-icon-share"></span>
                <div class="count">转发</div>
              </div>
            </div>
          </div>
          <div v-if="moment.unfoldComment">
            <!--评论-->
            <div class="commentContainer">
              <div class="replyContainer">
                <div>
                  <el-avatar shape="circle" :src="moment.headPic"></el-avatar>
                  <el-input class="reply" autosize type="textarea" placeholder="请输入内容" v-model="myComment.content" maxlength="500"></el-input>
                </div>
                <div class="replyButton">
                  <div></div>
                  <div>
                    <el-button size="medium" round>发表</el-button>
                  </div>
                </div>
              </div>
              <div class="line"></div>
              <!--评论-->
              <div class="commentItem" v-for="(comment,index) in moment.comments" :key="index">
                <div class="commentTop">
                  <div class="topLeft pointer">
                    <el-avatar class="commentHeadPic" shape="circle" :src="comment.headPic"></el-avatar>
                    <div class="title">
                      <div class="nickName">{{comment.nickName}}</div>
                      <div class="baseInfo">
                        <span>{{comment.year}}年 -</span>
                        <span>{{comment.education}} -</span>
                        <span>{{comment.currentCity}} -</span>
                        <span>{{comment.work}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="commentContent">
                  {{comment.content}}
                </div>
                <div class="commentBottom">
                  <div class="bottomLeft">
                    <div>{{comment.createTime}}</div>
                  </div>
                  <div class="bottomRight">
                    <el-tooltip effect="dark" content="投诉" placement="top">
                      <span class="el-icon-warning-outline fontIcon" @click="clickComplaint(comment.userId,comment.nickName,comment.content)"></span>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="评论" placement="top">
                      <div class="el-icon-chat-dot-round fontIcon" @click="clickReply(comment.nickName)"></div>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="点赞" placement="top">
                      <div v-if="!comment.like" class="fa fa-heart-o fontIcon"></div>
                      <div v-else class="fa fa-heart redColor fontIcon"></div>
                    </el-tooltip>
                  </div>
                </div>

                <!--回复-->
                <div class="replyItem" v-for="(reply,index) in comment.replys" :key="index">
                  <div class="replyTop">
                    <div class="replyTopLeft pointer">
                      <el-avatar class="replyHeadPic" shape="circle" :src="reply.headPic"></el-avatar>
                      <div class="title">
                        <div class="nickName">{{reply.nickName}}</div>
                        <div class="baseInfo">
                          <span>{{reply.year}}年 -</span>
                          <span>{{reply.education}} -</span>
                          <span>{{reply.currentCity}} -</span>
                          <span>{{reply.work}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="replyContent">
                    {{reply.content}}
                  </div>
                  <div class="commentBottom">
                    <div class="bottomLeft">
                      <div>{{reply.createTime}}</div>
                    </div>
                    <div class="bottomRight">
                      <el-tooltip effect="dark" content="投诉" placement="top">
                        <span class="el-icon-warning-outline fontIcon" @click="clickComplaint(reply.userId,reply.nickName,reply.content)"></span>
                      </el-tooltip>
                      <el-tooltip effect="dark" content="评论" placement="top">
                        <div class="el-icon-chat-dot-round fontIcon" @click="clickReply(comment.nickName)"></div>
                      </el-tooltip>
                      <el-tooltip effect="dark" content="点赞" placement="top">
                        <div v-if="!reply.like" class="fa fa-heart-o fontIcon"></div>
                        <div v-else class="fa fa-heart redColor fontIcon"></div>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
              </div>
              <!--查看更多-->
              <div class="line"></div>
              <div class="more pointer">
                查看更多 >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="topicContainer">
      <span>热门话题</span>
      <span>热门话题</span>
      <span>热门话题</span>
    </div>
    <!--回复对话框-->
    <el-dialog class="dialog" :title="'回复@'+replyDialog.userName" :visible.sync="replyDialog.visible" width="30%">
      <el-input type="textarea" placeholder="发布你的回复" :rows="3" maxlength="500" v-model="replyDialog.content"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" style="border:none" @click="replyDialog.visible = false">发 布</el-button>
      </span>
    </el-dialog>

    <!--投诉对话框-->
    <el-dialog class="dialog" :title="'我要投诉的是@'+complaintDialog.userName +'发表的评论'" style="" :visible.sync="complaintDialog.visible" width="30%">
      <span style="color:#409EFF">{{complaintDialog.userName}} :</span><span> {{complaintDialog.commentContent}}</span>
      <el-input style="padding-top:20px" type="textarea" placeholder="投诉原因" :rows="3" maxlength="500" v-model="complaintDialog.content"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" style="border:none" @click="complaintDialog.visible = false">提 交</el-button>
      </span>
    </el-dialog>

    <el-backtop target=".momentList" :bottom="100">
      <div style="
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      ">
        UP
      </div>
    </el-backtop>
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
      totalCount: 0,
      currentIndex: 1,
      //回复对话框
      replyDialog: {
        visible: false,
        userName: "",
        content: "",
      },
      //投诉对话框
      complaintDialog: {
        visible: false,
        userId: 1,
        userName: "",
        commentContent: "",
        content: "",
      },
      moments: [
        {
          id: 1,
          userId: 11,
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
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
            "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
          ],
          unfoldComment: false,
          comments: [
            {
              id: 1234,
              headPic:
                "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
              userId: 110,
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
                  userId: 1110,
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
                  userId: 4,
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
              userId: 3,
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
              userId: 4,
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
          id: 2,
          userId: 21,
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
          unfoldComment: false,
          comments: [
            {
              id: 1234,
              headPic:
                "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
              userId: 110,
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
                  userId: 110,
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
                  userId: 110,
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
              userId: 110,
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
              userId: 110,
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
          id: 3,
          userId: 21,
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
          unfoldComment: false,
          comments: [
            {
              id: 1234,
              headPic:
                "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
              userId: 110,
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
                  userId: 110,
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
                  userId: 110,
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
              userId: 110,
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
              userId: 110,
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
      ],
      user: {
        headPic:
          "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
      },
      myComment: {
        content: "",
      },
    };
  },
  methods: {
    redirect(path) {
      this.$router.push(path);
    },
    //展开评论
    unfoldComment(momentId) {
      this.moments.forEach((moment) => {
        if (moment.id === momentId) {
          moment.unfoldComment = !moment.unfoldComment;
          return;
        }
      });
    },
    //选择分类
    chooseTitle(index) {
      this.currentIndex = index;
    },
    //点击评论
    clickReply(nickName) {
      this.replyDialog.visible = true;
      this.replyDialog.userName = nickName;
    },
    //点击投诉
    clickComplaint(userId, nickName, commentContent) {
      this.complaintDialog.visible = true;
      this.complaintDialog.userName = nickName;
      this.complaintDialog.userId = userId;
      this.complaintDialog.commentContent = commentContent;
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
    font-size: 14px;
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
      background-color: #fff2e5;
      color: #ff8200;
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
  }
  .content {
    margin: 10px 0 0 50px;
    .desc {
      line-height: 1.5;
      font-size: 14px;
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
        margin-left: 4px;
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
      padding-right: 20px;
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
        padding: 10px 20px 0px 0px;
        .topLeft {
          display: flex;
          justify-content: flex-start;
        }
      }
      .commentContent {
        margin-left: 50px;
        font-size: 14px;
        margin-bottom: 10px;
        padding-right: 20px;
      }

      .replyItem {
        margin-left: 50px;
        font-size: 14px;
        .replyTop {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .replyTopLeft {
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
          .replyTopRight {
            padding-right: 20px;
          }
        }
        .replyContent {
          display: flex;
          justify-content: flex-start;
          padding: 0px 20px 10px 50px;
        }
      }
    }
    .more {
      text-align: center;
      margin: auto;
      height: 20px;
      line-height: 20px;
      padding-top: 10px;
      font-size: 14px;
    }
    .more:hover {
      color: #ff6666;
    }
  }
}

/*  加粗标题 */
.chooseTitle {
  font-weight: 700;
  color: #ff8200;
}
/* 图标 */
.commentBottom {
  color: #939393;
  margin-left: 50px;
  padding: 0 20px 10px 0;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  line-height: 20px;
}

.bottomRight {
  width: 90px;
  display: flex;
  justify-content: space-between;
  .fontIcon {
    font-size: 16px;
  }
  .fontIcon:hover {
    color: #e6a23c;
  }
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

.el-button {
  background-color: #ff7777;
  color: #fff;
}
.el-button:hover {
  background-color: #ff6666;
  color: #fff;
}
.title {
  margin-left: 10px;
  display: flex;
  padding: 5px;
  justify-content: space-between;
  flex-direction: column;
  height: 40px;
  margin-bottom: 6px;
}
.nickName {
  font-size: 14px;
  font-weight: 500;
  color: #eb7350;
}
.baseInfo {
  font-size: 10px;
  display: flex;
  justify-content: space-between;
  width: 136px;
  color: #909399;
}

.redColor {
  color: #ff6666;
}
.borderRadius {
  border-radius: 8px;
}
.dialog {
  .el-dialog__body {
    padding: 20px;
  }
}
</style>