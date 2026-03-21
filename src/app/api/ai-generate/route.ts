import { NextRequest, NextResponse } from 'next/server';

// 模拟智谱API响应
const mockZhipuApiResponse = {
  task_id: 'task_' + Date.now(),
  status: 'pending',
  data: {
    images: [
      {
        url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=placeholder&image_size=portrait_4_3'
      }
    ]
  }
};

// 模拟轮询响应
const mockPollingResponse = (taskId: string, attempts: number) => {
  if (attempts < 3) {
    return {
      task_id: taskId,
      status: 'pending',
      data: {
        images: [
          {
            url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=placeholder&image_size=portrait_4_3'
          }
        ]
      }
    };
  } else {
    return {
      task_id: taskId,
      status: 'success',
      data: {
        images: [
          {
            url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=' + encodeURIComponent('beautiful landscape with mountains and lake') + '&image_size=portrait_4_3'
          }
        ]
      }
    };
  }
};

// 存储任务状态
const taskStore = new Map<string, { status: string; imageUrl: string; attempts: number }>();

export async function POST(request: NextRequest) {
  try {
    const { prompt, style, aspectRatio, resolution } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: '请提供提示词' }, { status: 400 });
    }

    // 模拟调用智谱API
    const response = mockZhipuApiResponse;
    
    // 存储任务状态
    taskStore.set(response.task_id, {
      status: 'pending',
      imageUrl: response.data.images[0].url,
      attempts: 0
    });

    return NextResponse.json({
      task_id: response.task_id,
      status: response.status,
      imageUrl: response.data.images[0].url
    });
  } catch (error) {
    return NextResponse.json({ error: '生成失败' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const taskId = request.nextUrl.searchParams.get('task_id');
    if (!taskId) {
      return NextResponse.json({ error: '缺少task_id' }, { status: 400 });
    }

    const task = taskStore.get(taskId);
    if (!task) {
      return NextResponse.json({ error: '任务不存在' }, { status: 404 });
    }

    // 模拟轮询
    task.attempts++;
    const pollingResponse = mockPollingResponse(taskId, task.attempts);
    
    // 更新任务状态
    task.status = pollingResponse.status;
    task.imageUrl = pollingResponse.data.images[0].url;
    taskStore.set(taskId, task);

    return NextResponse.json({
      task_id: pollingResponse.task_id,
      status: pollingResponse.status,
      imageUrl: pollingResponse.data.images[0].url
    });
  } catch (error) {
    return NextResponse.json({ error: '轮询失败' }, { status: 500 });
  }
}
